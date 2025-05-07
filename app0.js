// API URL
const API_URL = 'http://localhost:5000/api';







        // Three.js 无人机模型
        let scene, camera, renderer, drone;
        
        function createUFO(x, y, z, color) {
            const ufoGroup = new THREE.Group();
            
            // 主体
            const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
            const bodyMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                wireframe: true
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            ufoGroup.add(body);
            
            // 旋翼
            const rotorGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 8);
            const rotorMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8
            });
            
            // 添加四个旋翼
            const rotorPositions = [
                [-1, 0.3, -1],
                [1, 0.3, -1],
                [-1, 0.3, 1],
                [1, 0.3, 1]
            ];
            
            rotorPositions.forEach(pos => {
                const rotor = new THREE.Mesh(rotorGeometry, rotorMaterial);
                rotor.position.set(...pos);
                rotor.rotation.x = Math.PI / 2;
                ufoGroup.add(rotor);
            });
            
            // 添加能量环
            const energyRingGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
            const energyRingMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            const energyRing = new THREE.Mesh(energyRingGeometry, energyRingMaterial);
            ufoGroup.add(energyRing);

            // 添加防护罩
            const shieldGeometry = new THREE.SphereGeometry(2.5, 32, 32);
            const shieldMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.1,
                wireframe: true
            });
            const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
            ufoGroup.add(shield);

            // 添加UFO光环
            const haloGeometry = new THREE.RingGeometry(2, 2.2, 32);
            const haloMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const halo = new THREE.Mesh(haloGeometry, haloMaterial);
            halo.rotation.x = Math.PI / 2;
            ufoGroup.add(halo);
            
            // 设置位置
            ufoGroup.position.set(x, y, z);
            
            return ufoGroup;
        }
        
        function initThreeJS() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            const canvas = document.getElementById('droneCanvas');
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            renderer.setSize(document.querySelector('.drone-container').offsetWidth, 
                           document.querySelector('.drone-container').offsetHeight);
            
            // 创建多个UFO模型
            const ufoGroup = new THREE.Group();
            
            // 创建主UFO
            const mainUFO = createUFO(0, 0, 0, 0x00ff88);
            ufoGroup.add(mainUFO);
            
            // 创建辅助UFO
            const ufoPositions = [
                { x: -3, y: 1, z: -2, color: 0x00a1ff },
                { x: 3, y: -1, z: -2, color: 0xff4444 },
                { x: 0, y: 2, z: -3, color: 0xffaa00 }
            ];
            
            ufoPositions.forEach(pos => {
                const ufo = createUFO(pos.x, pos.y, pos.z, pos.color);
                ufoGroup.add(ufo);
            });
            
            drone = ufoGroup;
            scene.add(drone);
            
            // 添加多个光源
            const lights = [
                new THREE.PointLight(0x00ff88, 1, 100),
                new THREE.PointLight(0x00a1ff, 1, 100),
                new THREE.AmbientLight(0x00ff88, 0.5)
            ];
            
            lights[0].position.set(0, 0, 50);
            lights[1].position.set(0, 0, -50);
            lights[2].position.set(0, 50, 0);
            
            lights.forEach(light => scene.add(light));
            
            camera.position.z = 5;
            
            animate();
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            if (drone) {
                // 旋转所有UFO
                drone.children.forEach((ufo, index) => {
                    // 整体旋转
                    ufo.rotation.y += 0.01;
                    
                    // 添加悬浮动画
                    ufo.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
                    
                    // 旋转能量环
                    ufo.children[4].rotation.x += 0.02;
                    ufo.children[4].rotation.z += 0.01;

                    // 旋转防护罩
                    ufo.children[5].rotation.y += 0.005;
                    ufo.children[5].rotation.x += 0.003;

                    // 旋转UFO光环
                    ufo.children[6].rotation.z += 0.01;
                    
                    // 添加随机移动
                    if (index > 0) { // 只对辅助UFO进行随机移动
                        ufo.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.01;
                        ufo.position.z += Math.cos(Date.now() * 0.0005 + index) * 0.01;
                    }
                });
            }
            
            renderer.render(scene, camera);
        }

        // 创建粒子效果
        function createParticles() {
            const container = document.getElementById('droneParticles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                container.appendChild(particle);
            }
        }

        // 创建UFO灯光效果
        function createUFOLights() {
            const container = document.getElementById('ufoLights');
            const lightCount = 12;
            const radius = 100;

            for (let i = 0; i < lightCount; i++) {
                const light = document.createElement('div');
                light.className = 'ufo-light';
                const angle = (i / lightCount) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                light.style.left = `calc(50% + ${x}px)`;
                light.style.top = `calc(50% + ${y}px)`;
                light.style.animationDelay = `${i * 0.2}s`;
                container.appendChild(light);
            }
        }

        // 表单提交处理
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言，我们会尽快回复！');
            this.reset();
        });

        // 创建纳米机器人粒子效果
        function createNanobotParticles() {
            const containers = ['nanobot1', 'nanobot2', 'nanobot3'];
            containers.forEach(containerId => {
                const container = document.getElementById(containerId);
                for (let i = 0; i < 30; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'nanobot-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 3 + 's';
                    container.appendChild(particle);
                }
            });
        }

        // 3D人体扫描效果
        let scanScene, scanCamera, scanRenderer, humanModel;
        let scanProgress = 0;
        let isScanning = false;

        function initHumanScan() {
            scanScene = new THREE.Scene();
            scanCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            const canvas = document.getElementById('hologramCanvas');
            scanRenderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            scanRenderer.setSize(document.querySelector('.hologram-container').offsetWidth, 
                               document.querySelector('.hologram-container').offsetHeight);
            
            // 创建更详细的人体模型
            const bodyGroup = new THREE.Group();

            // 创建身体主要部分
            const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.4, 2, 32);
            const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
            const armGeometry = new THREE.CylinderGeometry(0.1, 0.08, 1, 16);
            const legGeometry = new THREE.CylinderGeometry(0.15, 0.12, 1, 16);
            const neckGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
            const handGeometry = new THREE.SphereGeometry(0.12, 16, 16);
            const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.3);

            // 创建更真实的材质
            const mainMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.7,
                wireframe: true,
                wireframeLinewidth: 2
            });

            const energyMaterial = new THREE.MeshPhongMaterial({
                color: 0x00a1ff,
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });

            const organMaterial = new THREE.MeshPhongMaterial({
                color: 0xff4444,
                transparent: true,
                opacity: 0.4,
                wireframe: true
            });

            // 创建身体
            const body = new THREE.Mesh(bodyGeometry, mainMaterial);
            body.position.y = 0;
            bodyGroup.add(body);

            // 创建头部
            const head = new THREE.Mesh(headGeometry, mainMaterial);
            head.position.y = 1.2;
            bodyGroup.add(head);

            // 创建颈部
            const neck = new THREE.Mesh(neckGeometry, mainMaterial);
            neck.position.y = 1;
            bodyGroup.add(neck);

            // 创建手臂
            const leftArm = new THREE.Mesh(armGeometry, mainMaterial);
            leftArm.position.set(-0.7, 0.5, 0);
            leftArm.rotation.z = Math.PI / 4;
            bodyGroup.add(leftArm);

            const rightArm = new THREE.Mesh(armGeometry, mainMaterial);
            rightArm.position.set(0.7, 0.5, 0);
            rightArm.rotation.z = -Math.PI / 4;
            bodyGroup.add(rightArm);

            // 创建手部
            const leftHand = new THREE.Mesh(handGeometry, mainMaterial);
            leftHand.position.set(-0.7, 0, 0);
            bodyGroup.add(leftHand);

            const rightHand = new THREE.Mesh(handGeometry, mainMaterial);
            rightHand.position.set(0.7, 0, 0);
            bodyGroup.add(rightHand);

            // 创建腿部
            const leftLeg = new THREE.Mesh(legGeometry, mainMaterial);
            leftLeg.position.set(-0.3, -1.2, 0);
            bodyGroup.add(leftLeg);

            const rightLeg = new THREE.Mesh(legGeometry, mainMaterial);
            rightLeg.position.set(0.3, -1.2, 0);
            bodyGroup.add(rightLeg);

            // 创建脚部
            const leftFoot = new THREE.Mesh(footGeometry, mainMaterial);
            leftFoot.position.set(-0.3, -1.7, 0.1);
            bodyGroup.add(leftFoot);

            const rightFoot = new THREE.Mesh(footGeometry, mainMaterial);
            rightFoot.position.set(0.3, -1.7, 0.1);
            bodyGroup.add(rightFoot);

            // 添加内部器官
            const heartGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const heart = new THREE.Mesh(heartGeometry, organMaterial);
            heart.position.set(0, 0.5, 0.3);
            bodyGroup.add(heart);

            const lungGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const leftLung = new THREE.Mesh(lungGeometry, organMaterial);
            leftLung.position.set(-0.3, 0.3, 0.2);
            leftLung.scale.set(1, 1.2, 0.8);
            bodyGroup.add(leftLung);

            const rightLung = new THREE.Mesh(lungGeometry, organMaterial);
            rightLung.position.set(0.3, 0.3, 0.2);
            rightLung.scale.set(1, 1.2, 0.8);
            bodyGroup.add(rightLung);

            // 添加能量场效果
            const energyFieldGeometry = new THREE.SphereGeometry(2.5, 32, 32);
            const energyField = new THREE.Mesh(energyFieldGeometry, energyMaterial);
            bodyGroup.add(energyField);

            // 添加数据流效果
            const dataFlowGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
            const dataFlowMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.5,
                wireframe: true
            });
            const dataFlow = new THREE.Mesh(dataFlowGeometry, dataFlowMaterial);
            dataFlow.rotation.x = Math.PI / 2;
            bodyGroup.add(dataFlow);

            // 添加扫描环
            const scanRingGeometry = new THREE.TorusGeometry(2.2, 0.05, 16, 100);
            const scanRingMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const scanRing = new THREE.Mesh(scanRingGeometry, scanRingMaterial);
            scanRing.rotation.x = Math.PI / 2;
            bodyGroup.add(scanRing);

            // 添加扫描线
            const scanLineGeometry = new THREE.PlaneGeometry(4, 0.1);
            const scanLineMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            });
            const scanLine = new THREE.Mesh(scanLineGeometry, scanLineMaterial);
            scanLine.position.y = -2;
            bodyGroup.add(scanLine);

            // 添加粒子系统
            const particleCount = 1000;
            const particleGeometry = new THREE.BufferGeometry();
            const particlePositions = new Float32Array(particleCount * 3);
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x00ff88,
                size: 0.05,
                transparent: true,
                opacity: 0.6
            });

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                particlePositions[i3] = (Math.random() - 0.5) * 4;
                particlePositions[i3 + 1] = (Math.random() - 0.5) * 4;
                particlePositions[i3 + 2] = (Math.random() - 0.5) * 4;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            bodyGroup.add(particles);

            // 添加多个光源
            const lights = [
                new THREE.PointLight(0x00ff88, 1, 100),
                new THREE.PointLight(0x00a1ff, 1, 100),
                new THREE.AmbientLight(0x00ff88, 0.5)
            ];
            
            lights[0].position.set(5, 5, 5);
            lights[1].position.set(-5, -5, 5);
            lights[2].position.set(0, 0, 5);
            
            lights.forEach(light => scanScene.add(light));

            // 添加环境光
            const ambientLight = new THREE.AmbientLight(0x404040);
            scanScene.add(ambientLight);

            scanCamera.position.z = 5;
            scanCamera.position.y = 0;

            humanModel = bodyGroup;
            scanScene.add(humanModel);

            // 添加鼠标控制
            const controls = new THREE.OrbitControls(scanCamera, canvas);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.screenSpacePanning = false;
            controls.minDistance = 3;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI;

            animateScan();
        }

        function animateScan() {
            requestAnimationFrame(animateScan);

            if (humanModel) {
                // 整体旋转
                humanModel.rotation.y += 0.01;

                // 心脏跳动动画
                const heart = humanModel.children[10];
                heart.scale.set(
                    1 + Math.sin(Date.now() * 0.005) * 0.1,
                    1 + Math.sin(Date.now() * 0.005) * 0.1,
                    1 + Math.sin(Date.now() * 0.005) * 0.1
                );

                // 肺部呼吸动画
                const leftLung = humanModel.children[11];
                const rightLung = humanModel.children[12];
                const breathScale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
                leftLung.scale.set(breathScale, breathScale * 1.2, breathScale * 0.8);
                rightLung.scale.set(breathScale, breathScale * 1.2, breathScale * 0.8);

                // 能量场脉动
                const energyField = humanModel.children[13];
                energyField.scale.set(
                    1 + Math.sin(Date.now() * 0.001) * 0.05,
                    1 + Math.sin(Date.now() * 0.001) * 0.05,
                    1 + Math.sin(Date.now() * 0.001) * 0.05
                );

                // 数据流旋转
                const dataFlow = humanModel.children[14];
                dataFlow.rotation.z += 0.02;

                // 扫描环动画
                const scanRing = humanModel.children[15];
                scanRing.rotation.z += 0.01;
                scanRing.position.y = Math.sin(Date.now() * 0.002) * 0.2;

                // 粒子系统动画
                const particles = humanModel.children[17];
                const positions = particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }

            if (isScanning) {
                scanProgress += 0.5;
                if (scanProgress > 100) {
                    scanProgress = 100;
                    isScanning = false;
                    updateScanStatus('扫描完成');
                }
                updateScanProgress(scanProgress);

                // 更新扫描线位置
                const scanLine = humanModel.children[16];
                if (scanLine) {
                    scanLine.position.y = -2 + (scanProgress / 100) * 4;
                    scanLine.material.opacity = 0.5 + Math.sin(Date.now() * 0.01) * 0.2;
                }
            }

            scanRenderer.render(scanScene, scanCamera);
        }

        function startScan() {
            isScanning = true;
            scanProgress = 0;
            updateScanStatus('正在扫描...');
            updateScanProgress(0);
        }

        function resetScan() {
            isScanning = false;
            scanProgress = 0;
            updateScanStatus('系统就绪');
            updateScanProgress(0);
        }

        function updateScanProgress(progress) {
            document.getElementById('scanProgress').textContent = Math.floor(progress) + '%';
            document.getElementById('scanProgressBar').style.width = progress + '%';
        }

        function updateScanStatus(status) {
            document.querySelector('.status-text').textContent = status;
        }

        // 更新无人机状态
        function updateDroneStatus() {
            const statusText = document.querySelector('.status-text');
            const statusIndicator = document.querySelector('.status-indicator');
            const statuses = [
                { text: '系统运行正常', color: '#00ff88' },
                { text: '正在执行任务', color: '#00a1ff' },
                { text: '电量低警告', color: '#ff4444' },
                { text: '信号不稳定', color: '#ffaa00' }
            ];

            let currentIndex = 0;
            setInterval(() => {
                const status = statuses[currentIndex];
                statusText.textContent = status.text;
                statusIndicator.style.background = status.color;
                currentIndex = (currentIndex + 1) % statuses.length;
            }, 3000);
        }

        // 更新数据面板
        function updateDataPanel() {
            const dataValues = document.querySelectorAll('.data-value');
            const progressBars = document.querySelectorAll('.progress-bar');

            setInterval(() => {
                dataValues.forEach((value, index) => {
                    let currentValue = parseFloat(value.textContent);
                    if (value.textContent.includes('%')) {
                        currentValue = Math.min(100, Math.max(0, currentValue + (Math.random() * 10 - 5)));
                        value.textContent = currentValue.toFixed(1) + '%';
                    } else if (value.textContent.includes('m')) {
                        currentValue = Math.min(1, Math.max(0.1, currentValue + (Math.random() * 0.2 - 0.1)));
                        value.textContent = currentValue.toFixed(1) + 'm';
                    }
                });

                progressBars.forEach(bar => {
                    const progress = Math.random() * 100;
                    bar.style.width = progress + '%';
                });
            }, 2000);
        }

        // 更新无人机信息
        function updateDroneInfo() {
            const infoText = document.querySelector('.drone-info');
            const messages = [
                '实时配送状态: 正在执行医疗物资配送任务',
                '实时配送状态: 已到达目标地点',
                '实时配送状态: 正在返航',
                '实时配送状态: 等待新任务'
            ];

            let currentIndex = 0;
            setInterval(() => {
                infoText.textContent = messages[currentIndex];
                currentIndex = (currentIndex + 1) % messages.length;
            }, 4000);
        }

        // 页面加载完成后初始化
        window.addEventListener('load', () => {
            initThreeJS();
            createParticles();
            createUFOLights();
            updateDroneStatus();
            updateDataPanel();
            updateDroneInfo();
            createNanobotParticles();
            initHumanScan();
            createQuantumParticles();
            setInterval(updateQuantumStats, 2000);
        });

        // 窗口大小改变时调整渲染器大小
        window.addEventListener('resize', () => {
            if (scanRenderer) {
                const container = document.querySelector('.hologram-container');
                scanCamera.aspect = container.offsetWidth / container.offsetHeight;
                scanCamera.updateProjectionMatrix();
                scanRenderer.setSize(container.offsetWidth, container.offsetHeight);
            }
        });

        // 添加量子粒子效果
        function createQuantumParticles() {
            const container = document.getElementById('quantumParticles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'quantum-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                container.appendChild(particle);
            }
        }

        // 更新量子状态
        function updateQuantumStats() {
            const stats = document.querySelectorAll('.quantum-stat');
            stats.forEach(stat => {
                const value = stat.querySelector('.stat-value');
                const progress = stat.nextElementSibling.querySelector('.progress-fill');
                
                if (value.textContent.includes('%')) {
                    const currentValue = parseFloat(value.textContent);
                    const newValue = Math.min(100, Math.max(0, currentValue + (Math.random() * 2 - 1)));
                    value.textContent = newValue.toFixed(1) + '%';
                    progress.style.width = newValue + '%';
                }
            });
        }

        // 添加导航栏滚动效果
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
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
    