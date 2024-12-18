const projectDescriptions = {
    project1: {
        title: "Project 1: Portfolio Website",
        description: "This portfolio website serves as a digital showcase for my academic and personal projects. It features a clean and modern design, with easy navigation between different projects categorized by semester. The website is built using HTML, CSS, and JavaScript, ensuring responsiveness and a smooth user experience. The goal of this project was to effectively communicate my skills and experiences in a visually appealing way.",
        image: "IMAGE1.jpg"
    },
    project2: {
        title: "Project 2: ToDo List App",
        description: "The ToDo List App is a simple yet powerful tool for managing daily tasks. Built with JavaScript, it allows users to add, edit, and delete tasks. The app features a user-friendly interface, providing a seamless experience. Users can filter tasks based on their completion status, making it easier to prioritize work and enhance productivity. The project aimed to strengthen my skills in JavaScript and user interface design.",
        image: "IMAGE2.jpg"
    },
    project3: {
        title: "Project 3: E-commerce Website",
        description: "This mock e-commerce website showcases my ability to create a fully functional online shopping experience. It includes features such as product listing, user authentication, and a shopping cart. The website is built using modern web technologies, including HTML, CSS, and JavaScript, with a focus on user experience and design. This project allowed me to explore back-end integration and database management.",
        image: "Image3.jpg"
    }
};

function showProjectDescription(projectId) {
    const project = projectDescriptions[projectId];
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-description").innerText = project.description;
    document.getElementById("description-background").style.backgroundImage = `url('${project.image}')`;
    document.getElementById("description-container").style.display = 'block';
}

function backToPortfolio() {
    document.getElementById("description-container").style.display = 'none';
}
