import React, { useState, useRef } from 'react';
import "./RetreatFourCuts.scss";
import { useNavigate } from "react-router-dom";

// Import your logo images - you'll need to add these files to your project
import logoColorImage from './grace-and-rest-color.png'; // Blue version
import logoBlackImage from './grace-and-rest-black.png'; // Black version

const generateRandomFilename = (baseFilename, extension, randomLength = 8) => {
    // Function to generate a random string of specified length
    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    // Generate random string
    const randomString = generateRandomString(randomLength);
    
    // Clean extension by removing dot if present
    const cleanExtension = extension.startsWith('.') ? extension.substring(1) : extension;
    
    // Return the complete filename
    return `${baseFilename}-${randomString}.${cleanExtension}`;
};

const RetreatFourCuts = () => {
    const [photos, setPhotos] = useState([null, null, null, null]); // State to store the uploaded photos
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); // State to track which photo is selected
    const [useColorLogo, setUseColorLogo] = useState(true); // Toggle between color and black logo
    const [frameType, setFrameType] = useState('horizontal'); // Changed default to vertical (4x1)
    const fileInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Refs for the file inputs
    const logoRef = useRef(null); // Ref for the logo element
    const navigate = useNavigate();
    
    // Function to handle photo upload
    const handlePhotoUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target && loadEvent.target.result) {
                    const newPhotos = [...photos];
                    newPhotos[index] = loadEvent.target.result;
                    setPhotos(newPhotos);
                    setSelectedPhotoIndex(null); // Deselect after upload
                }
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                alert("Failed to load the image. Please try again.");
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle photo click for selecting
    const handlePhotoClick = (index) => {
        if (photos[index]) {
            // If this photo is already selected, deselect it
            if (selectedPhotoIndex === index) {
                setSelectedPhotoIndex(null);
            } else {
                // Otherwise, select this photo
                setSelectedPhotoIndex(index);
            }
        } else {
            // If no photo, open file dialog to upload one
            if (fileInputRefs[index] && fileInputRefs[index].current) {
                // Reset the input before opening the file dialog
                fileInputRefs[index].current.value = "";
                fileInputRefs[index].current.click();
            }
        }
    };

    // Function to delete a photo
    const handleDeletePhoto = (index, e) => {
        e.stopPropagation(); // Prevent triggering the photo click handler
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
        setSelectedPhotoIndex(null); // Deselect after deletion

        // Reset the file input value so the same file can be selected again
        if (fileInputRefs[index] && fileInputRefs[index].current) {
            fileInputRefs[index].current.value = "";
        }
    };

    // Function to toggle logo color
    const toggleLogoColor = () => {
        setUseColorLogo(!useColorLogo);
    };

    // Function to toggle frame type
    const toggleFrameType = () => {
        // Reset photos when switching frame type
        if (photos.some(photo => photo)) {
            if (window.confirm('Changing frame type will reset your photos. Continue?')) {
                setPhotos([null, null, null, null]);
                setSelectedPhotoIndex(null); // Clear selection
                setTimeout(() => {
                    setFrameType(frameType === 'horizontal' ? 'vertical' : 'horizontal');
                }, 100); // Small delay for better visual transition
            }
        } else {
            setFrameType(frameType === 'horizontal' ? 'vertical' : 'horizontal');
        }
    };

    // Function to download the completed frame
    const handleDownload = () => {
        // Check if there are any photos to download
        if (!photos.some(photo => photo)) {
            alert('Please add at least one photo before downloading.');
            return;
        }

        // Get the actual frame element dimensions
        const frameElement = document.querySelector('.four-cuts-frame');
        if (!frameElement) {
            alert('Error: Could not find the frame element.');
            return;
        }

        // Get the frame's aspect ratio
        const frameRect = frameElement.getBoundingClientRect();
        const frameAspectRatio = frameRect.width / frameRect.height;

        // Detect if we're on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // First, load all original images at full resolution
        const imagePromises = photos.map((photo, index) => {
            if (!photo) return Promise.resolve(null);

            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({
                    img,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    index
                });
                img.onerror = () => resolve(null);
                img.src = photo;
            });
        });

        // Load the logo image as well
        const logoPromise = new Promise((resolve) => {
            const logoImg = new Image();
            logoImg.onload = () => resolve({
                img: logoImg,
                naturalWidth: logoImg.naturalWidth,
                naturalHeight: logoImg.naturalHeight
            });
            logoImg.onerror = () => resolve(null);
            logoImg.src = useColorLogo ? logoColorImage : logoBlackImage;
        });

        Promise.all([...imagePromises, logoPromise]).then(results => {
            // Get logo data (last item in the results)
            const logoData = results.pop();
            
            // Filter out any null results from photos
            const validImageData = results.filter(data => data !== null);

            if (validImageData.length === 0) {
                alert('No valid images to download.');
                return;
            }

            // Set target dimensions based on frame type and device
            let targetWidth, targetHeight;
            
            if (frameType === 'horizontal') {
                // For horizontal, prioritize width (as in original code)
                targetWidth = isMobile ? 1800 : 3000;
                targetHeight = Math.round(targetWidth / frameAspectRatio);
            } else {
                // For vertical frame, ensure high quality for the taller format
                // We prioritize height for the vertical format
                targetHeight = isMobile ? 2400 : 4000; // Taller for vertical format
                targetWidth = Math.round(targetHeight * frameAspectRatio);
                
                // Cap width if it gets too large
                if (targetWidth > 2000 && isMobile) {
                    targetWidth = 2000;
                    targetHeight = Math.round(targetWidth / frameAspectRatio);
                }
            }

            // Scale factors
            const scaleX = targetWidth / frameRect.width;
            const scaleY = targetHeight / frameRect.height;

            // Create the canvas with the target dimensions
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // Draw white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            // Get all photo spots
            const photoSpots = document.querySelectorAll('.photo-spot');
            if (!photoSpots.length) {
                alert('Error: Could not find photo elements.');
                return;
            }

            // Draw each photo at highest possible quality
            const drawPromises = [];

            photoSpots.forEach((spot, index) => {
                const imageData = validImageData.find(data => data.index === index);
                if (!imageData || !photos[index]) return;

                const promise = new Promise((resolve) => {
                    // Get positions relative to the frame
                    const spotRect = spot.getBoundingClientRect();
                    const x = Math.round((spotRect.left - frameRect.left) * scaleX);
                    const y = Math.round((spotRect.top - frameRect.top) * scaleY);
                    const width = Math.round(spotRect.width * scaleX);
                    const height = Math.round(spotRect.height * scaleY);

                    // Get original image dimensions
                    const imgWidth = imageData.naturalWidth;
                    const imgHeight = imageData.naturalHeight;

                    // Calculate cropping parameters (simulating object-fit: cover)
                    const spotAspect = spotRect.width / spotRect.height;
                    const imgAspect = imgWidth / imgHeight;

                    let sX = 0, sY = 0, sWidth = imgWidth, sHeight = imgHeight;

                    if (imgAspect > spotAspect) {
                        // Image is wider than spot - crop sides
                        sWidth = imgHeight * spotAspect;
                        sX = (imgWidth - sWidth) / 2;
                    } else {
                        // Image is taller than spot - crop top/bottom
                        sHeight = imgWidth / spotAspect;
                        sY = (imgHeight - sHeight) / 2;
                    }

                    // Draw the image directly to the main canvas, using the original data
                    // but cropped to match what's visible on screen
                    ctx.drawImage(
                        imageData.img,
                        Math.round(sX), Math.round(sY), Math.round(sWidth), Math.round(sHeight),
                        x, y, width, height
                    );

                    // Add the border
                    ctx.strokeStyle = '#999';
                    ctx.lineWidth = Math.max(1, Math.round(scaleX / 2));
                    ctx.strokeRect(x, y, width, height);

                    resolve();
                });

                drawPromises.push(promise);
            });

            Promise.all(drawPromises).then(() => {
                // Draw the logo
                if (logoData && logoRef.current) {
                    const logoRect = logoRef.current.getBoundingClientRect();
                    
                    // Calculate the center position of the logo area
                    const centerX = ((logoRect.left - frameRect.left) + (logoRect.width / 2)) * scaleX;
                    const centerY = ((logoRect.top - frameRect.top) + (logoRect.height / 2)) * scaleY;
                    
                    // Calculate the original logo dimensions
                    const logoAspectRatio = logoData.naturalWidth / logoData.naturalHeight;
                    const displayedWidth = Math.round(logoRect.width * scaleX);
                    const displayedHeight = Math.round(logoRect.height * scaleY);
                    
                    // Use the original aspect ratio to determine dimensions
                    let width, height;
                    
                    // Option 1: Set the width and calculate height based on aspect ratio
                    width = displayedWidth;
                    height = width / logoAspectRatio;
                    
                    // If height is too large, use Option 2
                    if (height > displayedHeight * 1.2) {
                        // Option 2: Set the height and calculate width based on aspect ratio
                        height = displayedHeight;
                        width = height * logoAspectRatio;
                    }
                    
                    // Calculate the top-left position to center the logo
                    const x = centerX - (width / 2);
                    const y = centerY - (height / 2);
                    
                    // Draw the logo with the correct aspect ratio, centered
                    ctx.drawImage(logoData.img, x, y, width, height);
                }

                // Add a border around the entire frame
                ctx.strokeStyle = '#ccc';
                ctx.lineWidth = Math.max(1, Math.round(scaleX / 2));
                ctx.strokeRect(0, 0, targetWidth, targetHeight);

                try {
                    // Use blob instead of dataURL for better mobile compatibility
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                console.error('Failed to create blob');
                                alert('Could not generate the image. Try with fewer or smaller photos.');
                                return;
                            }

                            try {
                                // Create a blob URL
                                const blobUrl = URL.createObjectURL(blob);

                                // Create download link
                                const link = document.createElement('a');
                                link.download = generateRandomFilename('grace-and-rest-four-cuts', 'png');
                                link.href = blobUrl;
                                link.click();

                                // Clean up the blob URL after download starts
                                setTimeout(() => {
                                    URL.revokeObjectURL(blobUrl);
                                }, 5000);
                            } catch (linkError) {
                                console.error('Error creating download:', linkError);

                                // Fallback for iOS Safari which may not support the download attribute
                                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                                    alert('For iOS devices: tap and hold on the image that appears next, then select "Save Image"');
                                    const img = document.createElement('img');
                                    img.src = URL.createObjectURL(blob);
                                    img.style.maxWidth = '100%';
                                    img.style.display = 'block';
                                    img.style.margin = '10px auto';

                                    const container = document.createElement('div');
                                    container.style.position = 'fixed';
                                    container.style.top = '0';
                                    container.style.left = '0';
                                    container.style.right = '0';
                                    container.style.bottom = '0';
                                    container.style.backgroundColor = 'rgba(0,0,0,0.8)';
                                    container.style.zIndex = '9999';
                                    container.style.padding = '20px';
                                    container.style.overflow = 'auto';

                                    const closeBtn = document.createElement('button');
                                    closeBtn.textContent = 'Close';
                                    closeBtn.style.display = 'block';
                                    closeBtn.style.margin = '10px auto';
                                    closeBtn.style.padding = '10px 20px';
                                    closeBtn.onclick = () => document.body.removeChild(container);

                                    container.appendChild(img);
                                    container.appendChild(closeBtn);
                                    document.body.appendChild(container);
                                }
                            }
                        },
                        'image/png',
                        1.0
                    );
                } catch (error) {
                    console.error('Error in canvas operation:', error);

                    // Try with a smaller canvas as fallback
                    if (targetWidth > 1024) {
                        alert('Creating high-resolution image failed. Trying with lower resolution...');

                        // Create a smaller canvas
                        const smallCanvas = document.createElement('canvas');
                        const smallCtx = smallCanvas.getContext('2d');
                        smallCanvas.width = 1024;
                        smallCanvas.height = Math.round(1024 / frameAspectRatio);

                        // Draw the larger canvas scaled down to the smaller one
                        smallCtx.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);

                        // Try to download the smaller version
                        const dataUrl = smallCanvas.toDataURL('image/png', 0.9);
                        const link = document.createElement('a');
                        link.download = 'grace-and-rest-four-cuts-small.png';
                        link.href = dataUrl;
                        link.click();
                    } else {
                        alert('Sorry, we could not generate the image on your device.');
                    }
                }
            }).catch(error => {
                console.error('Error drawing images:', error);
                alert('There was an error creating your image. Please try again.');
            });
        }).catch(error => {
            console.error('Error loading images:', error);
            alert('There was an error loading your images. Please try again.');
        });
    };

    return (
        <div className="page-container windows-style" onClick={() => setSelectedPhotoIndex(null)}>
            <div className="window" onClick={(e) => e.stopPropagation()}>
                <div className="title-bar">
                    <div className="title-bar-text">수양회네컷</div>
                    <div className="title-bar-controls">
                        <button>-</button>
                        <button>□</button>
                        <button onClick={() => navigate("/home")}>×</button>
                    </div>
                </div>
                <div className="window-content">
                    <div className="explorer-header">
                        <span>📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 {">"} 포토부스</span>
                    </div>
                    <div className="page-content">
                        <h2>수양회네컷</h2>
                        
                        {/* Frame Selection Area */}
                        <div className="frame-selection">
                            <h3>Select Frame Type:</h3>
                            <div className="frame-options">
                                <div 
                                    className={`frame-option ${frameType === 'horizontal' ? 'selected' : ''}`}
                                    onClick={() => frameType !== 'horizontal' && toggleFrameType()}
                                    title="Traditional 2×2 grid layout - vertical photos in each cell"
                                >
                                    <div className="frame-preview horizontal-preview">
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                    </div>
                                    <span>Horizontal (2×2)</span>
                                </div>
                                <div 
                                    className={`frame-option ${frameType === 'vertical' ? 'selected' : ''}`}
                                    onClick={() => frameType !== 'vertical' && toggleFrameType()}
                                    title="Four horizontal photos stacked in a column"
                                >
                                    <div className="frame-preview vertical-preview">
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                        <div className="preview-spot"></div>
                                    </div>
                                    <span>Vertical (1×4)</span>
                                </div>
                            </div>
                        </div>

                        <div className="frame-container">
                <div className="frame-info">
                                {frameType === 'horizontal' ? 
                                    'Horizontal layout (2×2 grid with vertical photos)' : 
                                    'Vertical layout (4 stacked horizontal photos)'}
                            </div>
                            <div className={`four-cuts-frame ${frameType}`}>
                                {photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className={`photo-spot ${photo ? 'has-photo' : ''} ${selectedPhotoIndex === index ? 'selected' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePhotoClick(index);
                                        }}
                                    >
                                        {photo ? (
                                            <>
                                                <img src={photo} alt={`${index + 1}`} />
                                                {selectedPhotoIndex === index && (
                                                    <div className="photo-controls">
                                                        <button
                                                            className="delete-button"
                                                            onClick={(e) => handleDeletePhoto(index, e)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M3 6h18"></path>
                                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                                                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="photo-placeholder">
                                                Click to add photo
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRefs[index]}
                                            onChange={(e) => handlePhotoUpload(index, e)}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                ))}
                                <div className="frame-logo" ref={logoRef}>
                                    <img 
                                        src={useColorLogo ? logoColorImage : logoBlackImage} 
                                        alt="Grace & Rest"
                                        onClick={toggleLogoColor}
                                        title="Click to toggle logo color"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button
                                onClick={handleDownload}
                                disabled={!photos.some(photo => photo)}
                                className="download-button"
                            >
                                Download
                            </button>
                            <button onClick={toggleLogoColor}>
                                Toggle Logo Color
                            </button>
                            <button onClick={() => navigate("/home")}>
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetreatFourCuts;