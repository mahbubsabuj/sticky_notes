//references
const notesContainer = document.getElementById('app')
const addNoteButton = notesContainer.querySelector('.add-note')
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElement, addNoteButton)
})
addNoteButton.addEventListener('click', () => addNote())
alert("Press (+) button to add Notes and double tap to delete note")
//get notes from local storage if local storage contains any exising notes otherwise returns an empty json 
function getNotes() {
    return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]')
}

//save notes in local storage
function saveNotes(notes) {
    localStorage.setItem('stickynotes-notes', JSON.stringify(notes))
}

//create new note
function createNoteElement(id, content) {
    const element = document.createElement('textarea')
    element.classList.add('note')
    element.value = content
    element.placeholder = 'Empty Sticky Note'
    element.addEventListener('change', () => {
        updateNotes(id, element.value)
    })
    element.addEventListener('dblclick', () => {
        const doDelete = confirm('do you want to delete this note ?')
        if (doDelete) {
            deleteNotes(id, element)
        }
    })
    return element
}

function addNote() {
    const notes = getNotes()
    const noteObject = {
        id: Math.floor(Math.random() * 100), 
        content: ''
    }
    const noteElement = createNoteElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElement, addNoteButton)
    notes.push(noteObject)
    saveNotes(notes)
}

//get existing notes and update current note
function updateNotes(id, newContent) {
    const notes = getNotes()
    const targetNote = notes.filter(note => note.id == id)[0]
    console.log(newContent)
    targetNote.content = newContent
    saveNotes(notes)
}

//delete current note from dom and local storage
function deleteNotes(id, element) {
    const notes = getNotes().filter(notes => notes.id != id)
    saveNotes(notes)
   notesContainer.removeChild(element)  
}
