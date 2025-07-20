let oven = null;
const url = `https://raw.githubusercontent.com/WolfeHall/forno-nardona-ar/main/assets/${name}.glb`;
loader.load(url,
function loadOven(name) {
  console.log("Loading oven:", name);
  const url = `https://raw.githubusercontent.com/WolfeHall/forno-nardona-ar/main/assets/${name}.glb`;
  loader.load(url,
    function (gltf) {
      console.log("✅ Model loaded:", name);
      if (oven) {
        scene.remove(oven);
        oven.traverse((obj) => {
          if (obj.material) obj.material.dispose();
          if (obj.geometry) obj.geometry.dispose();
        });
      }
      oven = gltf.scene;
      oven.scale.set(1, 1, 1);
      oven.position.set(0, 0, -1);
      scene.add(oven);
    },
    undefined,
    function (error) {
      console.error("❌ GLB load error:", error);
    }
  );
}

function changeOvenColor(colorHex) {
  if (!oven) return;
  oven.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material.color.set(colorHex);
      node.material.needsUpdate = true;
    }
  });
}

