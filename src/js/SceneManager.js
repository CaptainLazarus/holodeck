import Box from './Box';

export default class SceneManager {
    constructor() {
        this.boxes = [];
    }

    addBox(boxData) {
        const box = new Box(boxData.width, boxData.height, boxData.depth, boxData.color, boxData.position);
        this.boxes.push(box);
    }

    removeBox(boxId) {
        this.boxes = this.boxes.filter(box => box.id !== boxId);
    }
}
