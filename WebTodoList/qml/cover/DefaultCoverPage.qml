// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

import QtQuick 2.0
import Sailfish.Silica 1.0
import QtGraphicalEffects 1.0
import "../services" as Services

CoverBackground {
    id: root

    property real count: 0
    readonly property real iconSize: 172

    onStatusChanged: {
        if (status === PageStatus.Active) {
            tasksService.countToday(function (result) {
                root.count = result;
            });
        }
    }

    Services.TasksService {
        id: tasksService

        db: storage
    }

    Column {
        anchors {
            top: parent.top
            horizontalCenter: parent.horizontalCenter
            topMargin: Theme.paddingLarge
        }

        width: parent.width - Theme.paddingLarge * 2
        spacing: Theme.paddingMedium

        Image {
            width: iconSize
            height: iconSize
            anchors.horizontalCenter: parent.horizontalCenter

            source: Qt.resolvedUrl("../icons/WebTodoList.svg")
        }

        Text {
            width: parent.width
            horizontalAlignment: Text.AlignRight

            text: qsTr("Tasks for today")
            color: Theme.highlightColor
            wrapMode: Text.WordWrap
            font.pixelSize: Theme.fontSizeSmall
        }

        Text {
            width: parent.width
            horizontalAlignment: Text.AlignRight

            text: root.count
            color: Theme.highlightColor
            font {
                bold: true
                pixelSize: Theme.fontSizeMedium
            }
        }
    }
}
