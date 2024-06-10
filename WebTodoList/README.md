# Web TodoList

Web TodoList is a sample application that allows you to manage your tasks, which
includes:
- Creating tasks
- Editing them
- Viewing all tasks
- Viewing tasks for today

The main purpose of this example is to demonstrate the work of the WebView framework with an application written in React
and interactions between them through the event system.

### React

* Application written using MUI.
* Used by react-lottie.
* Used by react-router-dom.
* formik + yup forms.
* Two languages en_EN and ru_RU.
* Dialogue for selecting date MUI.
* Works independently in browser.
* Setting up for local work in Aurora OS.
* LocalStorage is used, there is data synchronization with Aurora OS.
* List of events for data exchange React <-> Aurora OS.
* Synchronization of MUI color schemes and Aurora OS atmospheres.
* Data recovery after opening the application.

### Aurora

* The application uses Sailfish.WebView 1.0.
* Sending atmospheric UI data to a web application.
* Sending locale to web application.
* Data recovery after opening the application.
* Preserve data sent from React when changed.

## Terms of Use and Participation

The source code of the project is provided under [the license](LICENSE.BSD-3-Clause.md),
which allows its use in third-party applications.

The [contributor agreement](CONTRIBUTING.md) documents the rights granted by contributors
of the Open Mobile Platform.

Information about the contributors is specified in the [AUTHORS](AUTHORS.md) file.

[Code of conduct](CODE_OF_CONDUCT.md) is a current set of rules of the Open Mobile
Platform which informs you how we expect the members of the community will interact
while contributing and communicating.

## Project Structure

The project has a standard structure of an application based on C++ and QML for Aurora OS.

* **[ru.auroraos.WebTodoList.pro](ru.auroraos.WebTodoList.pro)** file describes the project structure for the qmake build system.
* **[icons](icons)** directory contains the application icons for different screen resolutions.
* **[qml](qml)** directory contains the QML source code and the UI resources.
  * **[cover](qml/cover)** directory contains the application cover implementations.
  * **[icons](qml/icons)** directory contains the additional custom UI icons.
  * **[js](qml/js)** directory contains helper scripts.
  * **[models](qml/models)** directory contains models.
  * **[pages](qml/pages)** directory contains the application pages.
  * **[react](qml/react)** directory contains static build React application.
  * **[services](qml/services)** directory contains services.
  * **[WebTodoList.qml](qml/WebTodoList.qml)** file provides the application window implementation.
* **[rpm](rpm)** directory contains the rpm-package build settings.
  * **[ru.auroraos.WebTodoList.spec](rpm/ru.auroraos.WebTodoList.spec)** file is used by rpmbuild tool.
* **[src](src)** directory contains the C++ source code.
  * **[main.cpp](src/main.cpp)** file is the application entry point.
* **[translations](translations)** directory contains the UI translation files.
* **[ru.auroraos.WebTodoList.desktop](ru.auroraos.WebTodoList.desktop)** file defines the display and parameters for launching the application.

## Compatibility

The project is compatible with all the current versions of the Aurora OS.

## Project Building

The project is assembled in the usual way using the Aurora SDK.
The React application is built statically on node v18.18.1 LTS, npm v9.8.1 with the `--openssl-legacy-provider` key.

## Screenshots

![screenshots](screenshots/screenshots.png)

## This document in Russian / Перевод этого документа на русский язык

- [README.ru.md](README.ru.md)
