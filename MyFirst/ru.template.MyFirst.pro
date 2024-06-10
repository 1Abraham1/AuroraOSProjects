TARGET = ru.template.MyFirst

CONFIG += \
    auroraapp

PKGCONFIG += \

SOURCES += \
    src/main.cpp \

HEADERS += \

DISTFILES += \
    qml/pages/AddEventPage.qml \
    qml/pages/DayPage.qml \
    qml/pages/GraphicEditorPage.qml \
    qml/pages/func.js \
    rpm/ru.template.MyFirst.spec \

AURORAAPP_ICONS = 86x86 108x108 128x128 172x172

CONFIG += auroraapp_i18n

TRANSLATIONS += \
    translations/ru.template.MyFirst.ts \
    translations/ru.template.MyFirst-ru.ts \
