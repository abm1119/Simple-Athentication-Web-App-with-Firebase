// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your_api key of firebase here",
  authDomain: "firebase_auth_domain",
  projectId: "project_id_here",
  storageBucket: "storage_bucket",
  messagingSenderId: "------------",
  appId: "________  your_app_id_____"
};

// Get the modal and its elements
const successModal = document.getElementById("successModal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.querySelector(".close");

// Function to show the modal with a message
function showModal(message) {
  modalMessage.textContent = message;
  successModal.style.display = "block";
}

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
  successModal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    successModal.style.display = "none";
  }
});






// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Handle Registration
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
      // Display error message
      document.getElementById("error").textContent = error.message;
    }
  });
}

// Handle Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showModal("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      document.getElementById("error").textContent = error.message;
    }
  });
}
// Get the logout button
const logoutButton = document.getElementById("logoutButton");

  // Handle Logout
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showModal("Logout successful! Redirecting to home...");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  });
}

// Track Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, show the logout button
    if (logoutButton) logoutButton.style.display = "block";
  } else {
    // User is signed out, hide the logout button
    if (logoutButton) logoutButton.style.display = "none";
  }
});
