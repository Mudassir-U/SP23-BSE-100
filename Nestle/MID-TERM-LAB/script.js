const projectDescriptions = {
    project1: {
        title: "Project 1: Portfolio Website",
        description: "This portfolio website serves as a digital showcase for my academic and personal projects. It features a clean and modern design, with easy navigation between different projects categorized by semester. The website is built using HTML, CSS, and JavaScript, ensuring responsiveness and a smooth user experience. The goal of this project was to effectively communicate my skills and experiences in a visually appealing way.",
        image: "https://codehalweb.com/wp-content/uploads/2023/05/thumbnail-12.jpg"
    },
    project2: {
        title: "Project 2: ToDo List App",
        description: "The ToDo List App is a simple yet powerful tool for managing daily tasks. Built with JavaScript, it allows users to add, edit, and delete tasks. The app features a user-friendly interface, providing a seamless experience. Users can filter tasks based on their completion status, making it easier to prioritize work and enhance productivity. The project aimed to strengthen my skills in JavaScript and user interface design.",
        image: "https://th.bing.com/th?id=OIP.7tjvMSbeIUUvgSStCgudDgHaGG&w=275&h=226&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
    },
    project3: {
        title: "Project 3: E-commerce Website",
        description: "This mock e-commerce website showcases my ability to create a fully functional online shopping experience. It includes features such as product listing, user authentication, and a shopping cart. The website is built using modern web technologies, including HTML, CSS, and JavaScript, with a focus on user experience and design. This project allowed me to explore back-end integration and database management.",
        image: "https://th.bing.com/th/id/OIP.MG3jMCfWYBkmBerbDjW5VAHaE9?rs=1&pid=ImgDetMain"
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
