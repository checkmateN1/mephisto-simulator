var uploadWindow = document.getElementById("upload-window");

function displayUploadWindow() {
    if (!uploadWindow.classList.contains("appear-fast")) {
        uploadWindow.classList.add("appear-fast");
    }
}

function removeUpload() {
    if (uploadWindow.classList.contains("appear-fast")) {
        uploadWindow.classList.remove("appear-fast");
    }
    return false;
}

restartListener();

