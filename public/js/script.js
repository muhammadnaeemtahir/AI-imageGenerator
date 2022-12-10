function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error(
        "The image could not be generated, either your description is not appropriate."
      );
    }

    const data = await response.json();

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner-border").classList.remove("d-none");
  document.querySelector(".spinner-border").classList.add("d-block");
}

function removeSpinner() {
  document.querySelector(".spinner-border").classList.remove("d-block");
  document.querySelector(".spinner-border").classList.add("d-none");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
