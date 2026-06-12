interface Student {
    id: number;
    name: string;
    age: number;
    course: number;
}

type CreateStudentDTO = Omit<Student, 'id'>;
class GenericList<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}
const studentManager = new GenericList<Student>();
interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T;
}
async function fetchStudentsApi(): Promise<ApiResponse<Student[]>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 'success',
                data: [
                    { id: 101, name: "API Daneka", age: 21, course: 3 },
                    { id: 102, name: "API Aslan", age: 23, course: 4 },
                    {id: 103, name: "API Malika", age: 18, course: 1},
                    {id: 104, name: "API Aou", age: 19, course: 2}
                ]
            });
        }, 800);
    });
}
const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const ageInput = document.getElementById('ageInput') as HTMLInputElement;
const courseInput = document.getElementById('courseInput') as HTMLInputElement;
const listElement = document.getElementById('studentList') as HTMLUListElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const apiBtn = document.getElementById('apiBtn') as HTMLButtonElement;
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

    const newStudent: Student = {
        id: Date.now(),
        name: name,
        age: age,
        course: course
    };

    studentManager.add(newStudent);
    render();
    nameInput.value = '';
});
apiBtn.addEventListener('click', async () => {
    apiBtn.textContent = "Загрузка...";
    apiBtn.disabled = true;

    try {
        const response = await fetchStudentsApi();
        response.data.forEach(s => studentManager.add(s));
        render();
    } catch (e) {
        console.error(e);
    } finally {
        apiBtn.textContent = "Загрузить из API (Mock)";
        apiBtn.disabled = false;
    }
});