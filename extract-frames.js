const { execFileSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, 'public', 'assets', 'video.mp4');
const outDir = path.join(__dirname, 'public', 'assets', 'high_res_sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
} else {
  fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
}

console.log(`Extracting frames using: ${ffmpegPath}`);
console.log(`From: ${videoPath}`);
console.log(`To: ${outDir}/frame-%03d.jpg`);

try {
  execFileSync(ffmpegPath, [
    '-i', videoPath,
    '-q:v', '2', // High quality JPEG
    path.join(outDir, 'frame-%03d.jpg')
  ]);
  console.log('Extraction complete!');
} catch (e) {
  console.error('Error extracting frames:', e.message);
  if (e.stderr) console.error(e.stderr.toString());
}
