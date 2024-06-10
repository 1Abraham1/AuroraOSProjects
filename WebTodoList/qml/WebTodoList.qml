// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0 as Sql
import "services"

ApplicationWindow {
    id: application

    objectName: "applicationWindow"

    // db for save state webstorage
    property var storage: Sql.LocalStorage.openDatabaseSync(
                             "ru.auroraos.webtodolist.sql",
                             "1.0",
                             "Save state webstorage"
                         )

    initialPage: Qt.resolvedUrl("pages/MainPage.qml")
    cover: Qt.resolvedUrl("cover/DefaultCoverPage.qml")
    allowedOrientations: defaultAllowedOrientations
}
