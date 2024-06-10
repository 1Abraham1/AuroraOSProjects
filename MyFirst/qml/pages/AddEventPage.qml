import QtQuick 2.0
import Sailfish.Silica 1.0

Page {
     id: page
     backgroundColor: "#141414"
     property string text_color: "#e30000"
     property string button_color: "#800000"

     QtObject {
         id: current_day
         property string year: ""
         property string month: ""
         property string day: ""
     }

     function init(y, m, d, flag){
         try {
             current_day.year = y
             current_day.month = m
             current_day.day = d
             date.text = current_day.day + "." + current_day.month + "." + current_day.year
         } catch (e) {
             console.log("ERROR")
         }
     }
     SilicaListView {
        anchors.fill: parent

        header: Column {
            width: parent.width
            height: header.height + mainColumn.height + Theme.paddingLarge

            PageHeader {
                id: header
//                title: qsTr("Событие")
                titleColor: "white"
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
                    Text {
                        objectName: "aboutButton"
                        text: qsTr("Событие")
                        color: "white"
                        font.pixelSize: Theme.fontSizeLargeBase
                        anchors.verticalCenter: parent.verticalCenter
                        anchors.horizontalCenter: parent.horizontalCenter
                    }
                ]
            }

            Component {
                id: back_textfield
                Rectangle {
                    height: 80
                    width: page.width - 40
                    color: "#212121"
                    radius: 20
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top: parent.top
                }
            }

            Column {
                id: mainColumn
                width: parent.width
                spacing: Theme.paddingLarge

                TextField {
                    id: date
                    focus: true
//                    textMargin: 2*Theme.paddingLarge
                    color: "white"
                    backgroundStyle: TextEditor.FilledBackground//NoBackground
//                    background: back_textfield
                    placeholderColor: "#5c5c5c"
//                    label: qsTrId("Дата начала")
                    placeholderText: qsTrId("Дата начала")
                    EnterKey.iconSource: "image://theme/icon-m-enter-next"
                    EnterKey.onClicked: height.focus = true
//                    Component.onCompleted: {
//                        date.text = current_day.day + "." + current_day.month + "." + current_day.year
//                    }
                }

                TextField {
                    id: name
                    focus: true
                    backgroundStyle: TextEditor.FilledBackground
                    placeholderColor: "#5c5c5c"
                    label: qsTrId("Название")
                    color: "white"
                    EnterKey.iconSource: "image://theme/icon-m-enter-next"
                    EnterKey.onClicked: circle.focus = true
//                    leftItem: Icon {
//                        source: "image://theme/icon-m-mail"
//                    }
                }

                TextArea {
                    id: desc
                    focus: true
                    color: "white"
                    backgroundStyle: TextEditor.FilledBackground
                    placeholderColor: "#5c5c5c"
                    label: qsTrId("Описание")
                }

                Button {
                    id: calculateButton
                    anchors.horizontalCenter: parent.horizontalCenter
//                    anchors.top: circle.bottom
                    backgroundColor: button_color
                    color: "white"
                    text: "Сохранить"
                    onClicked: onCalculateClicked()
                }

                Label {
                    id: result1
                    anchors.horizontalCenter: parent.horizontalCenter
                }

                Label {
                    id: result2
                    anchors.horizontalCenter: parent.horizontalCenter
                }

                Label {
                    id: result3
                    anchors.horizontalCenter: parent.horizontalCenter
                }
            }

            function onCalculateClicked(){
                  var h=Number(height.text);
                  var w=Number(weight.text);
                  var c=Number(circle.text);
                  if (isNullInField(height.text)||isNullInField(weight.text)||isNullInField(circle.text)){
                      result1.text = "Заполните все поля!";
                      result2.text = "";
                      result3.text = "";
                      return;
                  }
                  var gen,index,s;
                  if (combo.currentIndex===0){
                      gen=19;
                  }else{
                      gen=16;
                  }
                   h=h/100;
                   index=w/(h*h);
                   index=index*(gen/c);
                   if(index<16)s="дефицит веса";
                   else if(index>=16&&index<20)s="Недостаточный вес";
                   else if(index>=20&&index<25)s="Норма";
                   else if(index>=25&&index<30)s="Предожирение";
                   else if(index>=30&&index<35)s="Первая степень ожирения";
                   else if(index>=35&&index<40)s="Вторая степень ожирения";
                   else s="Морбидное ожирение";

                  result1.text = somatoType(gen,c) + "\nИМТ="+index.toFixed(2);
                  result2.text = s
                  if(s==="Норма"){
                      result2.color = "green"
                  }else{
                      result2.color = "red"
                  }
                  result3.text = normalMassMin(c,h,gen) + "\n" + normalMassMax(c,h,gen);
            }
            function isNullInField(p){
                    return p.length === 0;
                }
            function  normalMassMin(x,y,z){
                  var im=x*(y*y)/z;
                  return "Нижний предел нормального веса:\n"+20*im.toFixed(2)+" кг";
              }
            function normalMassMax(x,y,z){
                var im=x*(y*y)/z;
                return "Верхний предел нормального веса:\n"+25*im.toFixed(2)+" кг";
            }
            function  somatoType(a,b){
                var s="";
                var asthenic = "Тип телосложения: астенический.";
                var normosthenic = "Тип телосложения: нормостенический";
                var hypersthenic = "Тип телосложения: гиперстенический";
                switch(a){
                    case 19:
                        if(b<18)s=asthenic;
                        else if(b>=18&&b<=20)s=normosthenic;
                        else s=hypersthenic;
                        break;
                    case 16:
                        if(b<15)s=asthenic;
                        else if(b>=15&&b<=17)s=normosthenic;
                        else s=hypersthenic;
                        break;
                        default:
                        break;
                }
                return s;
            }
        }

        VerticalScrollDecorator {}

        }
     }
