// Your code here

function createEmployeeRecord(array) {
    return {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(arrays) {
    let newArray = arrays.map(array => createEmployeeRecord(array))
    return newArray
}

function createTimeInEvent(object, dateStamp) {
    // console.log("object", object)
    // console.log("dateStamp", dateStamp)
    
    let array = dateStamp.split(" ")
    // console.log(array)
    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(array[1], 10),
        date: array[0]
    })
    return object
}

function createTimeOutEvent(object, dateStamp){
    
    let array = dateStamp.split(" ")
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(array[1], 10),
        date: array[0]
    })

    return object
}

function hoursWorkedOnDate(employeeRecord, formDate) {
    // console.log("emplyee", employeeRecord)
    // console.log("formDate", formDate)

    let inEvent =  employeeRecord.timeInEvents.find(object => {
        // console.log(object)
        return object.date === formDate
    })

    let outEvent = employeeRecord.timeOutEvents.find(object => {
        return object.date === formDate
    })


    let hoursWorked = Math.abs((inEvent.hour - outEvent.hour) / 100);
    // console.log(hoursWorked)

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateForm) {
// console.log("employeeRecord", employeeRecord)
// console.log("dateForm", dateForm)

let inEvent =  employeeRecord.timeInEvents.find(object => {
    // console.log(object)
    return object.date === dateForm
})

let outEvent = employeeRecord.timeOutEvents.find(object => {
    return object.date === dateForm
})


let hoursWorked = Math.abs((inEvent.hour - outEvent.hour) / 100);
let payOwed = hoursWorked * employeeRecord.payPerHour
    
return payOwed
}

function allWagesFor(employee) {
    // console.log("employee", employee)

    // accumulate the value of all dates worked by the employee
    // Amount should be returned as a number
    // use wagesEarnedOnDate for this
    
    let timeIn = employee.timeInEvents.map(event => event.date)    
    // console.log("timeIn", timeIn)
    
    let reduceTimeIn = timeIn.reduce((a, b) =>{
        // console.log(wagesEarnedOnDate(employee, b))
        return a + wagesEarnedOnDate(employee, b)
    }, 0)
    // console.log("reduceTimeIn", reduceTimeIn)
    return reduceTimeIn    
}


function calculatePayroll(array) {
    // console.log("array", array)

    // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee. Amount should be returned as a number.
    let intitialValue = 0
    let allWages = array.reduce((accumulator, currentEmployee) => {
       return accumulator + allWagesFor(currentEmployee) 
    }, intitialValue)


    // we want to return the Sum of pay owed to all employees for all dates, as a number
    return allWages
}
