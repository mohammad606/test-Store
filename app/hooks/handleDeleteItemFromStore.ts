import {deletData} from "@/app/serves/firebaseQuery";
import Swal from "sweetalert2";


const HandleDeleteItemFromStore = (url:string)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't Delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            deletData(url)
            return window.location.reload()
        }
    });




}

export default HandleDeleteItemFromStore