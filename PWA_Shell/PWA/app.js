// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageName = button.dataset.page;
        
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show selected page
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        // Haptic feedback on navigation
        triggerHaptic();
    });
});

// Haptic Feedback
function triggerHaptic() {
    const statusEl = document.getElementById('haptic-status');
    let hapticTriggered = false;
    
    // Try webkit haptic feedback first (iOS native - better quality)
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.haptic) {
        window.webkit.messageHandlers.haptic.postMessage('impact');
        hapticTriggered = true;
    }
    
    // Fallback to vibrate API
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
        hapticTriggered = true;
    }
    
    // Update status
    if (statusEl) {
        if (hapticTriggered) {
            statusEl.textContent = '✅ Haptic feedback triggered!';
            statusEl.style.background = '#d4edda';
            statusEl.style.color = '#155724';
        } else {
            statusEl.textContent = '⚠️ Haptic feedback not supported on this device';
            statusEl.style.background = '#fff3cd';
            statusEl.style.color = '#856404';
        }
    }
}

// Audio functionality
let audioContext = null;
let oscillator = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playBeep() {
    const statusEl = document.getElementById('audio-status');
    statusEl.textContent = '🎵 Playing beep sound...';
    statusEl.style.background = '#d1ecf1';
    statusEl.style.color = '#0c5460';
    
    playTone(800, 0.3);
    
    setTimeout(() => {
        statusEl.textContent = '✅ Beep sound completed!';
        statusEl.style.background = '#d4edda';
        statusEl.style.color = '#155724';
    }, 300);
}

function playTone(frequency, duration = 1) {
    try {
        const context = initAudioContext();
        
        // Stop any existing oscillator
        if (oscillator) {
            oscillator.stop();
        }
        
        oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + duration);
        
        const statusEl = document.getElementById('audio-status');
        statusEl.textContent = `🎵 Playing ${frequency}Hz tone...`;
        statusEl.style.background = '#d1ecf1';
        statusEl.style.color = '#0c5460';
        
        setTimeout(() => {
            statusEl.textContent = '✅ Tone completed!';
            statusEl.style.background = '#d4edda';
            statusEl.style.color = '#155724';
        }, duration * 1000);
        
    } catch (error) {
        console.error('Audio playback error:', error);
        const statusEl = document.getElementById('audio-status');
        statusEl.textContent = `❌ Error: ${error.message}`;
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

async function stopAudio() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    if (audioContext) {
        await audioContext.close();
        audioContext = null;
    }
    
    const statusEl = document.getElementById('audio-status');
    statusEl.textContent = '⏹️ Audio stopped';
    statusEl.style.background = '#f8d7da';
    statusEl.style.color = '#721c24';
}

// Camera functionality
let cameraStream = null;
let videoElement = null;

async function startCamera() {
    const statusEl = document.getElementById('camera-status');
    videoElement = document.getElementById('cameraVideo');
    
    try {
        statusEl.textContent = '📷 Requesting camera access...';
        statusEl.style.background = '#d1ecf1';
        statusEl.style.color = '#0c5460';
        
        const constraints = {
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = cameraStream;
        videoElement.style.display = 'block';
        document.getElementById('capturedPhoto').style.display = 'none';
        
        statusEl.textContent = '✅ Camera started successfully!';
        statusEl.style.background = '#d4edda';
        statusEl.style.color = '#155724';
        
    } catch (error) {
        console.error('Camera error:', error);
        statusEl.textContent = `❌ Camera error: ${error.message}`;
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

function stopCamera() {
    const statusEl = document.getElementById('camera-status');
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        
        if (videoElement) {
            videoElement.srcObject = null;
            videoElement.style.display = 'none';
        }
        
        statusEl.textContent = '⏹️ Camera stopped';
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
    } else {
        statusEl.textContent = '⚠️ Camera is not running';
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#856404';
    }
}

function capturePhoto() {
    const statusEl = document.getElementById('camera-status');
    
    if (!cameraStream) {
        statusEl.textContent = '⚠️ Please start the camera first';
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#856404';
        return;
    }
    
    try {
        const canvas = document.getElementById('photoCanvas');
        const video = document.getElementById('cameraVideo');
        const photo = document.getElementById('capturedPhoto');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0);
        
        photo.src = canvas.toDataURL('image/png');
        photo.style.display = 'block';
        video.style.display = 'none';
        
        statusEl.textContent = '📸 Photo captured!';
        statusEl.style.background = '#d4edda';
        statusEl.style.color = '#155724';
        
        // Haptic feedback on capture
        triggerHaptic();
        
    } catch (error) {
        console.error('Capture error:', error);
        statusEl.textContent = `❌ Capture error: ${error.message}`;
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

// Microphone functionality
let mediaRecorder = null;
let audioChunks = [];
let micStream = null;
let analyser = null;
let animationId = null;

async function startRecording() {
    const statusEl = document.getElementById('mic-status');
    
    try {
        statusEl.textContent = '🎤 Requesting microphone access...';
        statusEl.style.background = '#d1ecf1';
        statusEl.style.color = '#0c5460';
        
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Setup audio context for visualization
        const context = initAudioContext();
        const source = context.createMediaStreamSource(micStream);
        analyser = context.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        
        // Start visualization
        visualizeAudio();
        
        mediaRecorder = new MediaRecorder(micStream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            document.getElementById('recordingPlayer').src = audioUrl;
            
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        };
        
        mediaRecorder.start();
        
        statusEl.textContent = '🔴 Recording... (Click "Stop Recording" when done)';
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
        
    } catch (error) {
        console.error('Microphone error:', error);
        statusEl.textContent = `❌ Microphone error: ${error.message}`;
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

function stopRecording() {
    const statusEl = document.getElementById('mic-status');
    
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        
        statusEl.textContent = '✅ Recording stopped! Click "Play Recording" to listen.';
        statusEl.style.background = '#d4edda';
        statusEl.style.color = '#155724';
    } else {
        statusEl.textContent = '⚠️ No active recording to stop';
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#856404';
    }
}

function playRecording() {
    const player = document.getElementById('recordingPlayer');
    const statusEl = document.getElementById('mic-status');
    
    if (player.src) {
        player.play();
        statusEl.textContent = '▶️ Playing recording...';
        statusEl.style.background = '#d1ecf1';
        statusEl.style.color = '#0c5460';
    } else {
        statusEl.textContent = '⚠️ No recording available. Please record first.';
        statusEl.style.background = '#fff3cd';
        statusEl.style.color = '#856404';
    }
}

function visualizeAudio() {
    if (!analyser) return;
    
    const canvas = document.getElementById('visualizer');
    const canvasContext = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
        animationId = requestAnimationFrame(draw);
        
        analyser.getByteTimeDomainData(dataArray);
        
        canvasContext.fillStyle = '#f0f0f0';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = '#4CAF50';
        canvasContext.beginPath();
        
        const sliceWidth = canvas.width / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;
            
            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }
            
            x += sliceWidth;
        }
        
        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    };
    
    draw();
}

// Online/Offline status
function updateOnlineStatus() {
    const statusEl = document.getElementById('online-status');
    
    if (navigator.onLine) {
        statusEl.textContent = '🟢 Online';
        statusEl.classList.remove('offline');
    } else {
        statusEl.textContent = '🔴 Offline';
        statusEl.classList.add('offline');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initial status check
updateOnlineStatus();

// Log initialization
console.log('PWA App initialized successfully');
