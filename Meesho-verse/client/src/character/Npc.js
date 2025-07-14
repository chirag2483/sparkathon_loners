import SplitFileLoader from "../env/SplitFileLoader.js";

const folder = "src/character/";
const animation = folder + "animations/idle.fbx";

// Use SplitFileLoader for the large npc.fbx file
const npcParts = [
  "src/character/models/npc/npc_part_aa",
  "src/character/models/npc/npc_part_ab"
];

const Npc = new SplitFileLoader(npcParts, [animation], 0.02).getModel();

export default Npc;
