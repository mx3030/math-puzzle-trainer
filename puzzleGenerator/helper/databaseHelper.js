import { ref, set, get, update, child, remove} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "../../main/db.js"

/*helper functions for better developement control with firebase*/
/*maybe implement in puzzleGenerator.html as menu with run button*/

export async function deleteTemps(){
    var root = ref(db)
    var tempsRef = child(root,'temps')
    await remove(tempsRef)
    console.log("temp node deleted")
}

export async function deletePuzzles(){
    remove(ref(db,'puzzles')) 
}

export async function resetDatabase(){
    remove(ref(db))
}

export async function deleteRooms(){
    remove(ref(db,'games'))
}
