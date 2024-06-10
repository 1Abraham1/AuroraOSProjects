// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

import QtQuick 2.0
import Sailfish.Silica 1.0
import QtGraphicalEffects 1.0
import Sailfish.WebView 1.0
import Sailfish.WebEngine 1.0
import "../js/utils.js" as Utils

Rectangle {
    id: root

    property var tasksService

    // For listen change any value in object
    readonly property string object: JSON.stringify(colorScheme)

    color: 'transparent'

    // Changed object color scheme
    onObjectChanged: {
        // if webview ready
        if (webview.initialized) {
            // stop timer if recall and timer run
            timerSend.stop();
            // timer start
            timerSend.start();
        }
    }

    // Create object colors for send in js
    QtObject {
        id: colorScheme

        objectName: 'scheme'

        property bool isDark : Theme.colorScheme === Theme.LightOnDark
        property string darkPrimaryColor : Theme.darkPrimaryColor.toString()
        property string darkSecondaryColor : Theme.darkSecondaryColor.toString()
        property string errorColor : Theme.errorColor.toString()
        property string highlightBackgroundColor : Theme.highlightBackgroundColor.toString()
        property string highlightColor : Theme.highlightColor.toString()
        property string highlightDimmerColor : Theme.highlightDimmerColor.toString()
        property string lightPrimaryColor : Theme.lightPrimaryColor.toString()
        property string lightSecondaryColor : Theme.lightSecondaryColor.toString()
        property string overlayBackgroundColor : Theme.overlayBackgroundColor.toString()
        property string primaryColor : Theme.primaryColor.toString()
        property string secondaryColor : Theme.secondaryColor.toString()
        property string secondaryHighlightColor : Theme.secondaryHighlightColor.toString()
    }

    // Sending code data object finished changing
    Timer {
        id: timerSend

        repeat: false
        interval: 10
        onTriggered: webview.runJavaScript("root.setThemeColors(" + JSON.stringify(colorScheme) + ");")
    }

    // WebView with react
    WebView {
        id: webview

        // If react ready
        property bool initialized: false

        active: true

        anchors.fill: parent
        url: Qt.resolvedUrl("../react/index.html")

        // Set framescript with event listener js
        onViewInitialized: {
            webview.loadFrameScript(Qt.resolvedUrl("../js/framescript.js"));
            webview.addMessageListener("webview:action");
        }

        // Listen events from react
        onRecvAsyncMessage: {
            Utils.logAsyncMessage(message, data.action)
            switch (data.action) {
            case 'init':
                var scheme = colorScheme;
                // send locale
                webview.runJavaScript("root.setLocale('" + Qt.locale().name + "');");
                // send color scheme
                webview.runJavaScript("root.setThemeColors(" + JSON.stringify(colorScheme) + ");");
                // send cache data
                tasksService.selectRows(function (result) {
                    webview.runJavaScript("root.setTasks(" + JSON.stringify(result) + ");");
                })
                break;
            case 'setThemeColors':
                // show webview
                //webview.opacity = 1.0
                // set ready state
                webview.initialized = true;
                break;
            case 'updateTask':
                tasksService.updateRow(data.data, function(result) {
                    webview.runJavaScript("root.listener(" + JSON.stringify(result) + ");");
                });
                break;
            case 'deleteTask':
                tasksService.deleteRow(data.data, function(result) {
                    webview.runJavaScript("root.listener(" + JSON.stringify(result) + ");");
                });
                break;
            }
        }

        // Engine configuration
        Component.onCompleted: {
            // You can disable cors if need
            WebEngineSettings.setPreference("security.disable_cors_checks", true, WebEngineSettings.BoolPref);
        }
    }
}

