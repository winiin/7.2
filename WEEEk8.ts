var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator"throw"); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GenericList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const studentManager = new GenericList();
function fetchStudentsApi() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'success',
                    data: [
                        { id: 101, name: "API Malika", age: 20, course: 3 },
                        { id: 102, name: "API Ivan", age: 22, course: 4 },
                        { id: 103, name: "API Arman", age: 18, course: 1 },
                        { id: 104, name: "API Malik", age: 19, course: 2 }
                    ]
                });
            }, 800);
        });
    });
}
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const courseInput = document.getElementById('courseInput');
const listElement = document.getElementById('studentList');
const addBtn = document.getElementById('addBtn');
const apiBtn = document.getElementById('apiBtn');
function render() {
    listElement.innerHTML = ''; // Очищаем список
    const students = studentManager.getAll();
    if (students.length === 0) {
        listElement.innerHTML = '<li>Список пуст</li>';
        return;
    }
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = ${student.name} (Возраст: ${student.age}, Курс: ${student.course});
        listElement.appendChild(li);
    });
}
addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const course = parseInt(courseInput.value);
    if (!name) {
        alert("Введите имя!");
        return;
    }
    const newStudent = {
        id: Date.now(),
        name: name,
        age: age,
        course: course
    };
    studentManager.add(newStudent);
    render();
    nameInput.value = '';
});
apiBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    apiBtn.textContent = "Загрузка...";
    apiBtn.disabled = true;
    try {
        const response = yield fetchStudentsApi();
        response.data.forEach(s => studentManager.add(s));
        render();
    }
    catch (e) {
        console.error(e);
    }
    finally {
        apiBtn.textContent = "Загрузить из API (Mock)";
        apiBtn.disabled = false;
    }
}));