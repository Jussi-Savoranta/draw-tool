
    const canvas1 = document.querySelector('#layer1');
    const canvas0 = document.querySelector('#layer2');
    const saveCanvas = document.querySelector('#layer3')

    const ctx1 = canvas1.getContext('2d');
    const ctx0 = canvas0.getContext('2d');
    const ctxS = saveCanvas.getContext('2d');

    let canvasColor = document.getElementById('canvasColor').value;
    canvas1.width = window.innerWidth * 0.74;
    canvas1.height = window.innerHeight;
    canvas0.width = window.innerWidth * 0.74;
    canvas0.height = window.innerHeight;
    saveCanvas.width = window.innerWidth * 0.74;
    saveCanvas.height = window.innerHeight;

    ctx1.lineJoin = 'round';
    ctx1.lineCap = 'round';
    ctx1.lineWidth = 10; 
    ctx0.fillStyle = canvasColor;
    ctx0.fillRect(0, 0, canvas1.width, canvas1.height);
    widthUpdate();
    document.getElementById('colorBox').checked = true;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = document.getElementById('brushColor').value;
    let lastHue = hue;
    let direction = true;
    let erasing = false;

    function draw(e) {
      

      if(!isDrawing) return; // stop the fn from running when not moused down

      if(erasing) {
         ctx1.globalCompositeOperation="destination-out";
         ctx1.strokeStyle = "rgba(255,255,255,1)";
      } else {
        ctx1.globalCompositeOperation="source-over";
        ctx1.strokeStyle = lastHue;
      }
      
      

      ctx1.beginPath();
      ctx1.moveTo(lastX, lastY);
      ctx1.lineTo(e.offsetX, e.offsetY);
      ctx1.stroke();

      [lastX, lastY] = [e.offsetX, e.offsetY]; //lastY = e.offsetY; JA lastX = e.offsetX; IISIMMIN ILMAISTUNA
    }

    canvas1.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    function eraserBoxHandler(e){
      lastHue = hue;
      let color = document.getElementById('colorBox').checked;
      const eraser = document.getElementById('eraserBox').checked; 
      

      if(eraser) {
        document.getElementById('colorBox').checked = false;
        erasing = true;
      } else {
        document.getElementById('colorBox').checked = true;

        erasing = false;
      }

     
      
   

    }


    function widthUpdate(){
        
        ctx1.lineWidth = this.value;
        //let width = ctx1.lineWidth;
          document.getElementById('brushWidth').innerHTML = "Width: " + ctx1.lineWidth;
         
      }

      function handleColor(){
        console.log (hue);
        hue = this.value;
        lastHue = hue;
        document.getElementById('eraserBox').checked = false;
        document.getElementById('colorBox').checked = true;
        erasing = false;
        ctx1.globalCompositeOperation="source-over";
      }

      function save() {
      
        
        ctxS.drawImage(canvas0, 0, 0);
        ctxS.drawImage(canvas1, 0, 0);


        const a = document.createElement('a');
        
        document.body.appendChild(a);
        a.href = saveCanvas.toDataURL('image/jpeg');
        a.download = 'drawing.jpeg'
        a.click();
        document.body.removeChild(a);
      }
     
     
       


      function colorBoxHanler() {
        document.getElementById('eraserBox').checked = false;
        document.getElementById('colorBox').checked =true;
        hue = lastHue;
        erasing = false;
        console.log('drawing')
      }

      function updateBackground() {
        
        canvasColor = this.value;
        console.log(canvasColor)
        document.getElementById('column left').style.backgroundColor = canvasColor;
        ctx0.fillStyle = this.value;
        ctx0.fillRect(0, 0, canvas1.width, canvas1.height);
        //ctx1.getImageData(0, 0, width, height);
      }

      
       
    const bacgroundInput = document.querySelectorAll('.controls input[id=canvasColor]');
    const widthInput = document.querySelectorAll('.controls input[id=width]');
    const colorInput = document.querySelectorAll('.controls input[id=brushColor]');
    const eraserBox = document.querySelector('.eraserBox input')
    const colorBox = document.querySelectorAll('.hue input[type="checkbox"]')

    console.log(bacgroundInput);

    bacgroundInput.forEach(input => input.addEventListener('change', updateBackground));
    widthInput.forEach(input => input.addEventListener('change', widthUpdate));
    colorInput.forEach(input => input.addEventListener('change', handleColor));
    eraserBox.addEventListener('click', eraserBoxHandler);
    colorBox.forEach(input => input.addEventListener('click', colorBoxHanler));
    
    canvas1.addEventListener('mousemove', draw);
    canvas1.addEventListener('mouseup', () => isDrawing = false);
    canvas1.addEventListener('mouseout', () => isDrawing = false);