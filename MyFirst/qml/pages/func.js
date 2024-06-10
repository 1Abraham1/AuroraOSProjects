function get_month(m) {
    var months = ['Декабрь', 'Январь', "Февраль", "Март",
             "Апрель", "Май", "Июнь", "Июль",
             "Август", "Сентябрь", "Октябрь", "Ноябрь"]
    return months[m-1]
}

function get_day_week(form) {
    var ru_days = ["Понедельник", "Вторник", "Среда", "Четверг",
                "Пятница", "Суббота", "Воскресенье"]
    var en_shortdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    var ru_shortdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
    var w = form.split(" ")[0]
    for (var i = 0; i<7; i++) {
        if (w === en_shortdays[i] | w === ru_shortdays[i]) {
            return ru_days[i]
        }
    }
    return false
}
function get_correct_month(m) {
    var months = ['декабря', 'января', "февраля", "марта",
             "апреля", "мая", "июня", "июля",
             "августа", "сентября", "октября", "ноября"]
    return months[m-1]
}
