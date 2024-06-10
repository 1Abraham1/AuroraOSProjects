import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../qml/pages/func.js" as Func

Page {
    id: page
    backgroundColor: "#141414"
    objectName: "mainPage"
    allowedOrientations: Orientation.All

    PageHeader {
        id: pageHeader
        objectName: "pageHeader"
        title: qsTr("Template")
        titleColor: "#e30000"
        extraContent.children: [
            IconButton {
                id: aboutButton
                objectName: "aboutButton"
                icon.source: "image://theme/icon-m-about"
                anchors.verticalCenter: parent.verticalCenter

                onClicked: pageStack.push(Qt.resolvedUrl("AboutPage.qml"))
            },
            Button {
                objectName: "add_event_button"
                backgroundColor: "transparent"
                color: "#e30000"
                anchors.left: aboutButton.right
                width: 50

                Text {
                    text: "+"
                    color: "#e30000"
                    font.pixelSize: Theme.fontSizeExtraLarge
                    anchors.centerIn: parent
                }
                anchors.verticalCenter: parent.verticalCenter
                onClicked: pageStack.push(Qt.resolvedUrl("AddEventPage.qml"))
            }
        ]
    }
    Row {
        id: dayweeks
        anchors.top: pageHeader.bottom
        height: 50
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("пн")
                anchors.horizontalCenter: parent.horizontalCenter
//                            anchors.verticalCenter: parent.verticalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("вт")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("ср")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: 'transparent'
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("чт")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("пт")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("сб")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
        Rectangle {
            color: "transparent"
            height: 40
            width: datePicker.cellWidth
            Text {
                text: qsTr("вс")
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.bottom: parent.bottom
                color: "#525252"
            }
        }
    }

    Rectangle {
        color: '#0d0d0d'
        anchors.top: dayweeks.bottom
        width: page.width
        height: page.height - pageHeader.height

        SilicaFlickable {
            id: flickable
            clip: true
            anchors.fill: parent
            contentHeight: layout.height + panels.height + pageHeader.height + Theme.paddingLarge

            Column {
                id: layout
                objectName: "layout"
                width: page.width
                spacing: 10

//                Button {
//                    objectName: "graphiceditorButton"
//                    anchors.horizontalCenter: parent.horizontalCenter
//                    text: "Открыть редактор"
//                    onClicked: pageStack.push(Qt.resolvedUrl("GraphicEditorPage.qml"))
//                }

                ListView {
                    objectName: "flickable2"
                    contentWidth: page.width

                    contentHeight: panels.height + Theme.paddingLarge

                    Column {
                        id: panels
                        spacing: 50

                        Column {
                            Label {
                                text: Func.get_month(datePicker.month) + " " + datePicker.year
                                color: "white"
        //                        anchors.bottom: datePicker
                                font.pixelSize: Theme.fontSizeExtraLargeBase
                                leftPadding: 20
                            }
                            DatePicker {
                                id: datePicker
                //                ColorPickerPage: ""

                                monthYearVisible: false
                                daysVisible: false
                                weeksVisible: false
                                _weekColumnVisible: false

                                function getModelData(dateObject, primaryMonth) {
                                    var y = dateObject.getFullYear()
                                    var m = dateObject.getMonth() + 1
                                    var d = dateObject.getDate()
                                    var data = {'year': y, 'month': m, 'day': d,
                                                'primaryMonth': primaryMonth,
                                                'holiday': (m === 1 && d === 1) || (m === 12 && (d === 25 || d === 26))}
                                    return data
                                }

                                modelComponent: Component {
                                    ListModel { }
                                }

                                onUpdateModel: {
                                    var i = 0
                                    var dateObject = new Date(fromDate)
                                    while (dateObject < toDate) {
                                        if (i < modelObject.count) {
                                            modelObject.set(i, getModelData(dateObject, primaryMonth))
                                        } else {
                                            modelObject.append(getModelData(dateObject, primaryMonth))
                                        }
                                        dateObject.setDate(dateObject.getDate() + 1)
                                        i++
                                    }
                                }
                                delegate: MouseArea {
                                    width: datePicker.cellWidth
                                    height: datePicker.cellHeight

                                    onClicked: {
                                        datePicker.date = new Date(year, month-1, day, 12, 0, 0)
                                        var page = pageStack.push(Qt.resolvedUrl("DayPage.qml"))
                                        page.init(datePicker.year, datePicker.month, datePicker.day, datePicker.date.toString())
    //                                    Func.func()
                                    }
                                    Label {
                                        anchors.centerIn: parent
                                        text: day
                                        color: month === primaryMonth ? "#ff0000" : "#800000"
                //                        font.bold: holiday
                                        font.pixelSize: !holiday? Theme.fontSizeMedium : Theme.fontSizeExtraSmall
                                    }
                                }
                            }
                        }
                        Column {
                            Component.onCompleted: {
                                datePicker2.date = new Date(2024, 6, 1, 12, 0, 0)
                            }

                            Label {
                                text: Func.get_month(datePicker2.month) + " " + datePicker2.year
                                color: "white"
        //                        anchors.bottom: datePicker
                                font.pixelSize: Theme.fontSizeExtraLargeBase
                                leftPadding: 20
                            }

                            DatePicker {
                                id: datePicker2
                //                ColorPickerPage: ""

                                monthYearVisible: false
                                daysVisible: false
                                weeksVisible: false
                                _weekColumnVisible: false

                                function getModelData(dateObject, primaryMonth) {
                                    var y = dateObject.getFullYear()
                                    var m = dateObject.getMonth() + 1
                                    var d = dateObject.getDate()
                                    var data = {'year': y, 'month': m, 'day': d,
                                                'primaryMonth': primaryMonth,
                                                'holiday': (m === 1 && d === 1) || (m === 12 && (d === 25 || d === 26))}
                                    return data
                                }

                                modelComponent: Component {
                                    ListModel { }
                                }

                                onUpdateModel: {
                                    var i = 0
                                    var dateObject = new Date(fromDate)
                                    while (dateObject < toDate) {
                                        if (i < modelObject.count) {
                                            modelObject.set(i, getModelData(dateObject, primaryMonth))
                                        } else {
                                            modelObject.append(getModelData(dateObject, primaryMonth))
                                        }
                                        dateObject.setDate(dateObject.getDate() + 1)
                                        i++
                                    }
                                }
                                delegate: MouseArea {
                                    width: datePicker2.cellWidth
                                    height: datePicker2.cellHeight

                                    onClicked: {
                                        datePicker2.date = new Date(year, month-1, day, 12, 0, 0)
                                        var page = pageStack.push(Qt.resolvedUrl("DayPage.qml"))
                                        page.init(datePicker2.year, datePicker2.month, datePicker2.day, datePicker2.date.toString())
    //                                    Func.func()
                                    }
                                    Label {
                                        anchors.centerIn: parent
                                        text: day
                                        color: month === primaryMonth ? "#ff0000" : "#800000"
                //                        font.bold: holiday
                                        font.pixelSize: !holiday? Theme.fontSizeMedium : Theme.fontSizeExtraSmall
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}
