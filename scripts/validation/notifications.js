let toastContainer=document.querySelector('.toast-container');

export function toastNotification(msg){
    let toast=document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML=`<i class="fa-solid fa-circle-check" style="color: #2aa428;"></i> ${msg}`;
    toastContainer.appendChild(toast);

    setTimeout(()=>{
        toast.remove()
    },4000)
}