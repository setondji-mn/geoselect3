document.addEventListener('DOMContentLoaded', () => {
    const selectedMunicipalities = new Set();
    const selectedList = document.getElementById('selectedMunicipalities');
    const svgWrapper = document.querySelector('.svg-wrapper');
    const mapContainer = document.querySelector('.map-container');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    const hoverLabel = document.querySelector('.hover-label');

    let scale = 1;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 4;
    const ZOOM_STEP = 0.2;

    // Panning variables
    let isPanning = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;

    // Update transform
    function updateTransform() {
        svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        zoomInBtn.disabled = scale >= MAX_SCALE;
        zoomOutBtn.disabled = scale <= MIN_SCALE;
    }

    // Zoom controls
    function updateZoom() {
        updateTransform();
    }

    function zoomIn() {
        if (scale < MAX_SCALE) {
            scale = Math.min(MAX_SCALE, scale + ZOOM_STEP);
            updateZoom();
        }
    }

    function zoomOut() {
        if (scale > MIN_SCALE) {
            scale = Math.max(MIN_SCALE, scale - ZOOM_STEP);
            updateZoom();
        }
    }

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }

    // Mouse wheel zoom
    svgWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    // Button controls
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetZoomBtn.addEventListener('click', resetZoom);

    // Panning event handlers
    mapContainer.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left click
        isPanning = true;
        mapContainer.classList.add('panning');
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    document.addEventListener('mouseup', () => {
        isPanning = false;
        mapContainer.classList.remove('panning');
    });

    // Municipality selection
    document.querySelectorAll('svg path').forEach(path => {
        path.addEventListener('mouseover', () => {
            hoverLabel.textContent = path.id;
            hoverLabel.classList.add('visible');
        });

        path.addEventListener('mouseout', () => {
            hoverLabel.classList.remove('visible');
        });

        path.addEventListener('click', () => {
            const municipalityId = path.id;
            
            if (selectedMunicipalities.has(municipalityId)) {
                selectedMunicipalities.delete(municipalityId);
                path.classList.remove('selected');
            } else {
                selectedMunicipalities.add(municipalityId);
                path.classList.add('selected');
            }

            updateSelectedList();
        });
    });

    function updateSelectedList() {
        selectedList.innerHTML = Array.from(selectedMunicipalities)
            .map(id => `<li>${id}</li>`)
            .join('');
    }
}); 