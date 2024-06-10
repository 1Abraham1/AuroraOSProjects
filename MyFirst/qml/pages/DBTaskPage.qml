import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0

Item {
    id: root

    property var db
    property string _table: "Tasks"

    function countToday(result) {
        db.transaction(function (tx) {
                var rs = tx.executeSql("SELECT count(*) as cnt FROM " + _table + " WHERE date(substr(date,0,11)) = date('now') ");
                result(rs.rows.item(0).cnt);
            });
    }

    function selectRows(result) {
        db.transaction(function (tx) {
                var rs = tx.executeSql("SELECT rowid, * FROM " + _table);
                var data = [];
                for (var i = 0; i < rs.rows.length; i++) {
                    model.id = rs.rows.item(i).rowid;
                    model.date = rs.rows.item(i).date;
                    model.name = rs.rows.item(i).name;
                    model.desc = rs.rows.item(i).desc;
                    data.push(model.copy());
                }
                result(data);
            });
    }

    function updateRow(data, result) {
        db.transaction(function (tx) {
                if (model.fromJson(data)) {
                    if (model.id === 0) {
                        tx.executeSql(
                            "INSERT INTO " + _table + " VALUES(?, ?, ?)",
                            [ model.date, model.name, model.desc]
                        );
                    } else {
                        tx.executeSql(
                            "UPDATE " + _table + " SET date=?, name=?, desc=? WHERE rowid=?",
                            [ model.date, model.name, model.desc, model.id]
                        );
                    }
                }
            }
        );
        selectRows(result);
    }

    function deleteRow(id, result) {
        db.transaction(function (tx) {
                tx.executeSql("DELETE FROM " + _table + " WHERE rowid=" + parseInt(id));
            }
        );
        selectRows(result);
    }

    Component.onCompleted: {
        // Create table if not exist
        db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS " + _table + "(date TEXT, name TEXT, desc TEXT)");
            }
        );
    }

    Models.TaskModel {
        id: model
    }
}

