// API URL
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const addForm = document.getElementById('addForm');
const searchForm = document.getElementById('searchForm');
const recordsTable = document.getElementById('recordsTable');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editForm = document.getElementById('editForm');
const saveEditBtn = document.getElementById('saveEdit');

// Load records on page load
document.addEventListener('DOMContentLoaded', loadRecords);

// Add record
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    
    try {
        const response = await fetch(`${API_URL}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            addForm.reset();
            loadRecords();
            alert('Record added successfully!');
        } else {
            alert(data.error || 'Error adding record');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding record');
    }
});

// Search records
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    loadRecords(searchTerm);
});

// Load records
async function loadRecords(search = '') {
    try {
        const response = await fetch(`${API_URL}/records${search ? `?search=${search}` : ''}`);
        const records = await response.json();
        
        recordsTable.innerHTML = '';
        
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td>${record.phone || ''}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2" onclick="editRecord(${record.id}, '${record.name}', '${record.email}', '${record.phone || ''}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord(${record.id})">Delete</button>
                </td>
            `;
            recordsTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading records');
    }
}

// Edit record
function editRecord(id, name, email, phone) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPhone').value = phone;
    editModal.show();
}

// Save edited record
saveEditBtn.addEventListener('click', async () => {
    const id = document.getElementById('editId').value;
    const formData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value
    };
    
    try {
        const response = await fetch(`${API_URL}/records/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            editModal.hide();
            loadRecords();
            alert('Record updated successfully!');
        } else {
            alert(data.error || 'Error updating record');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating record');
    }
});

// Delete record
async function deleteRecord(id) {
    if (!confirm('Are you sure you want to delete this record?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/records/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadRecords();
            alert('Record deleted successfully!');
        } else {
            alert('Error deleting record');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting record');
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化动画
    initAnimations();
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    
    // 添加按钮点击事件
    initButtons();
});

// 初始化动画
function initAnimations() {
    // 添加视差滚动效果
    const stars = document.querySelector('.stars');
    const twinkling = document.querySelector('.twinkling');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        twinkling.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    });
    
    // 添加全息图动画
    const hologram = document.querySelector('.hologram');
    if (hologram) {
        hologram.addEventListener('mousemove', (e) => {
            const rect = hologram.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            hologram.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                var(--primary-color), 
                var(--secondary-color))`;
        });
    }
}

// 处理滚动事件
function handleScroll() {
    // 添加滚动时的渐入效果
    const elements = document.querySelectorAll('.feature-card, .about-content, .tech-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // 导航栏滚动效果
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 247, 255, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.boxShadow = 'none';
    }
}

// 初始化按钮事件
function initButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

// 添加故障效果
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 255, 0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 247, 255, 0.7)
            `;
            
            setTimeout(() => {
                element.style.textShadow = 'none';
            }, 100);
        }, 3000);
    });
}

// 添加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 初始化页面
function initPage() {
    // 添加故障效果
    addGlitchEffect();
    
    // 添加打字机效果到副标题
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        typeWriter(subtitle, '探索AI的无限可能', 150);
    }
    
    // 添加视差滚动效果到功能卡片
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) * 0.01}deg)
                rotateY(${(x - rect.width/2) * 0.01}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
}

// 页面加载完成后初始化
window.addEventListener('load', initPage);

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 全息图动画效果
const hologram = document.querySelector('.robot-hologram');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    hologram.style.transform = `perspective(1000px) rotateY(${x * 10 - 5}deg) rotateX(${y * -10 + 5}deg)`;
});

// 案例卡片动画
const caseCards = document.querySelectorAll('.case-card');
caseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// 按钮点击效果
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
});

// 添加视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .feature-card, .tech-card');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 添加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后执行打字机效果
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    typeWriter(subtitle, '用科技守护健康，让关爱无处不在', 100);
});

// 添加粒子效果
function createParticles() {
    const container = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
    }
}

createParticles(); 