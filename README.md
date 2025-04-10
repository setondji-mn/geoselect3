

🗺 How the SVG Map Was Generated

This project uses a custom SVG map of Portugal’s municipalities for interactive selection. Here’s how the map was created from open data.

1. 🔽 Download the GeoJSON

We used the Opendatasoft platform to get a full GeoJSON of Portuguese municipalities:
	•	Dataset name: contornos-geograficos-dos-concelhos
	•	Format: GeoJSON
	•	Size: ~32MB

You can also access it via the Opendatasoft API if needed.

⸻

2. 🛠 Install Mapshaper (CLI)

To simplify the map and convert it to an SVG, install Mapshaper via npm:

npm install -g mapshaper



⸻

3. ✂️ Simplify and Export to SVG

We used the following command to:
	•	Simplify geometry (90% reduction)
	•	Set municipality names as path IDs
	•	Output clean, individual SVG paths

mapshaper portugal.geojson \
  -simplify 10% keep-shapes \
  -each 'id=con_name' \
  -o format=svg id-field=id combine-layers

	•	con_name is the name field for each municipality
	•	Each <path> in the output SVG has a unique id="MunicipalityName"

⸻

4. ✅ Output

The final portugal.svg file:
	•	Contains one <path> per municipality
	•	Uses id attributes for selection logic
	•	Is embedded directly in index.html
