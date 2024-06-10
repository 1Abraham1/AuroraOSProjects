// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

import QtQuick 2.0
import Sailfish.Silica 1.0
import "../services" as Services

Page {
    allowedOrientations: Orientation.All

    // service for change data
    Services.TasksService {
        id: tasksService

        db: storage
    }

    // webview component with web app
    WebViewReact {
        width: parent.width
        height: parent.height
        tasksService: tasksService
    }
}
