function showSection(sectionId) {

    // ซ่อนทุก section
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    // แสดง section ที่เลือก
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    // เลื่อนกลับไปด้านบน
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
