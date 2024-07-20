import QtQuick 2.0
import Sailfish.Silica 1.0
import "../../qml/pages/func.js" as Func
import QtQuick.LocalStorage 2.0


Page {
    id: page
    backgroundColor: "#141414"
    property string text_color: "#e30000"
    property string button_color: "#800000"
    objectName: "mainPage"
    allowedOrientations: Orientation.All

    property bool empty: true
    property var db
    property string _table: "Tasks"
//     DBTaskPage {
//         id: main_db
//     }
    QtObject {
        id: model
        objectName: "TaskModel"

        property int id: 0
        property string date: ""
        property string name: ""
        property string desc: ""

        function fromJson(json) {
            try {
                id = json['id'] === undefined ? 0 : parseInt(json['id']);
                date = json['date'];
                name = json['name'];
                desc = json['desc'];
            } catch (e) {
                return false;
            }
            return true;
        }

        function copy() {
            return {
                "id": id,
                "date": date,
                "name": name,
                "desc": desc
            };
        }
    }


    property var noteModel: ListModel {
//        ListElement {  }
//        ListElement {  }
    }
    function get_correct_date_my(d, m, y) {
        var dd, mm, yyyy
        if (d in ["1", "2", "3", "4", "5", "6", "7", '8', "9"]) {
            dd = "0" + d
        } else {
            dd = d
        }
        if (m in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
            mm = "0" + m
        } else {
            mm = m
        }
        yyyy = y
//        console.log("in js: " + dd + "." + mm + "." + yyyy)
        return dd + "." + mm + "." + yyyy
    }
    function selectRows(d, m, y) {
        var date_form = get_correct_date_my(d, m, y)
        console.log("get_correct_date: " + date_form)
        console.log("d, m, y: " + d + "." + m + "." + y)

        db.transaction(function (tx) {
                var rs = tx.executeSql("SELECT rowid, * FROM " + _table);
                var data = [];
                for (var i = 0; i < rs.rows.length; i++) {
                    model.id = rs.rows.item(i).rowid;
                    model.date = rs.rows.item(i).date;
                    model.name = rs.rows.item(i).name;
                    model.desc = rs.rows.item(i).desc;
                    console.log("Date_form1: " + date_form)
                    console.log("Date_form2: " + model.date)
                    if (date_form === model.date) {
                        noteModel.append({ "date": model.date, "name": model.name, "desc": model.desc })
                        console.log("SELECT: " + model.name)
                        data.push(model.copy());
                    }

                }
                if (data === []) {
                    console.log("data:", data)
                    empty = false
                }
            });
    }

    property string coorect_date: "ERR"
    QtObject {
        id: current_day
        property string year: ""
        property string month: ""
        property string day: ""
        property string format: ""
        property string coorect_date: ""
        property string day_week: ""
    }

    function init(y, m, d, form){
        console.log("current_day.coorect_date: " +  Func.get_correct_date(d, m, y))

//        current_day.coorect_date = Func.get_correct_date(d, m, y)
        coorect_date = Func.get_correct_date(d, m, y)
        current_day.year = y
        current_day.month = m
        current_day.day = d
        current_day.day_week = Func.get_day_week(form)
        current_day.format = current_day.day_week + " " + d +
                " " + Func.get_correct_month(m) + " " + y + qsTr("г.")
    }
//    function init(y, m, d, flag){
//        try {
//            current_day.year = y
//            current_day.month = m
//            current_day.day = d
//            date.text = current_day.day + "." + current_day.month + "." + current_day.year
//        } catch (e) {
//            console.log("ERROR")
//        }
//    }
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
                text: qsTr("Новая задача")
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
        id: menu
        color: '#0d0d0d'
        anchors.top: daylayout.bottom
        width: page.width
        height: page.height - pageHeader.height

        SilicaFlickable {
            id: flickable
            clip: true
            anchors.fill: parent
            contentHeight: empty_layout.height + noteListView.height + Theme.paddingLarge

            ListView {
                id: noteListView
                width: parent.width
                height: menu.height
                model: noteModel
                delegate: Item {
                    anchors.horizontalCenter: parent.horizontalCenter

                    Rectangle {
                        height: 250
                        width: page.width - 100
//                        anchors.margins: 50
                        anchors.horizontalCenter: parent.horizontalCenter
                        radius: 20
                        color: "#141414"
                        Rectangle {
                            id: recc
                            height: parent.height - 50
                            width: parent.width - 100
                            anchors.centerIn: parent
                            color: "transparent"
                            Row {
                                spacing: 100

                                Column {
                                    spacing: Theme.paddingLarge
                                    Text {
                                        text: model.name
                                        color: "white"
                                        font.pixelSize: Theme.fontSizeExtraLarge
                                    }
                                    Text {
                                        text: model.desc
                                        color: "grey"
                                        font.pixelSize: Theme.fontSizeLarge
                                    }
                                    Text {
                                        text: Func.get_format_date(model.date)
                                        color: "grey"
                                        font.pixelSize: Theme.fontSizeLarge
                                    }
                                }

                                Button {
                                    id: btnDelete
                                    height: 50
                                    width: 110
                                    text: "Delete"
                                    color: "white"
                                    backgroundColor: button_color
//                                    onClicked: deleteNote()
                                }
                            }
                        }
                    }
                }
            }

            Column {
                id: empty_layout
                visible: false
                width: page.width
                spacing: 50
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
                            text: "Нет задач"
                            color: "white"
                            anchors.verticalCenter: parent.verticalCenter
                            font.pixelSize: Theme.fontSizeLarge
                        }
                    }
                }
            }
        }

    }
    function initializeDatabase() {
        var dbase = LocalStorage.openDatabaseSync("Tasks", "1.0", "Tasks
                Database", 1000000)
        dbase.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS " + _table + "(date TEXT, name TEXT, desc TEXT)");
            console.log("Table connected!")
        })
        db = dbase
    }
    Component.onCompleted: {
        initializeDatabase()
        console.log("-----------")
        console.log("current_day.coorect_date: " + page.coorect_date)
        selectRows(current_day.day.toString(), current_day.month.toString(), current_day.year.toString())
        if (empty) {empty_layout.visible = true}
    }
}
