// SPDX-FileCopyrightText: 2023 Open Mobile Platform LLC <community@omp.ru>
// SPDX-License-Identifier: BSD-3-Clause

addEventListener("DOMContentLoaded", function (event) {
    event.originalTarget.addEventListener("framescript:action",
        function (event) {
            sendAsyncMessage("webview:action", event.detail)
    });
});
