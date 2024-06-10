// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

import QtQuick 2.0
import Sailfish.Silica 1.0

QtObject {
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
