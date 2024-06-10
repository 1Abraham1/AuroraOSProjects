import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../qml/pages/func.js" as Func

Page {
    id: page
    backgroundColor: "#141414"
    property string text_color: "#e30000"
    property string button_color: "#800000"
    objectName: "mainPage"
    allowedOrientations: Orientation.All
    QtObject {
        id: current_day
        property string year: ""
        property string month: ""
        property string day: ""
        property string format: ""
        property string day_week: ""
    }

    function init(y, m, d, form){
        current_day.year = y
        current_day.month = m
        current_day.day = d
        current_day.day_week = Func.get_day_week(form)
        current_day.format = current_day.day_week + " " + d +
                " " + Func.get_correct_month(m) + " " + y + qsTr("г.")
    }

    PageHeader {
        id: pageHeader
        objectName: "pageHeader"
//        title: qsTr("Template")
        titleColor: text_color
        extraContent.children: [
            Button {
                width: 100
                height: 50
                backgroundColor: "transparent"
                color: text_color
                text: qsTr("назад")
                onClicked: pageStack.pop()
                anchors.verticalCenter: parent.verticalCenter
            },
            Button {
                width: 250
                height: 50
                backgroundColor: "transparent"
                color: "white"
                text: qsTr("Новое событие")
                anchors.verticalCenter: parent.verticalCenter
                anchors.right: parent.right
                onClicked: {
                    var page = pageStack.push(Qt.resolvedUrl("AddEventPage.qml"))
                    page.init(current_day.year, current_day.month, current_day.day)
                }
            }
        ]
    }
    Column {
        id: daylayout
        anchors.top: pageHeader.bottom
        Label {
            font.pixelSize: Theme.fontSizeMediumBase
            text: current_day.format
            anchors.horizontalCenter: parent.horizontalCenter
        }
        Rectangle {
            border.width: 2
            border.color: "#303030"
            width: page.width
            height: 2
        }
    }
    Rectangle {
        color: '#0d0d0d'
        anchors.top: daylayout.bottom
        width: page.width
        height: page.height - pageHeader.height

        SilicaFlickable {
            id: flickable
            clip: true
            anchors.fill: parent
            contentHeight: layout.height + Theme.paddingLarge

            Column {
                id: layout
                width: page.width
                spacing: 50
//                Button {
//                    objectName: "Button"
//                    anchors.horizontalCenter: parent.horizontalCenter
//                    backgroundColor: button_color
//                    color: "white"
//                    text: qsTr("Создать событие")
//                    onClicked: {
//                        var page = pageStack.push(Qt.resolvedUrl("AddEventPage.qml"))
//                        page.init(current_day.yaer, current_day.month, current_day.day)
//                    }
//                }
                Rectangle {
                    height: 1
                    width: 1
                    color: "transparent"
                    Text {
                        text: ""
                    }
                }

                Rectangle {
                    height: 250
                    width: page.width - 100
                    anchors.margins: 50
                    anchors.horizontalCenter: parent.horizontalCenter
                    radius: 20
                    color: "#141414"
                    Rectangle {
                        height: parent.height - 50
                        width: parent.width - 100
                        anchors.centerIn: parent
                        color: "transparent"
                        Text {
                            text: "Нет событий"
                            color: "white"
                            anchors.verticalCenter: parent.verticalCenter
                            font.pixelSize: Theme.fontSizeLarge
                        }
                    }
                }
            }
        }

    }
}
