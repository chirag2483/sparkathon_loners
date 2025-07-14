# Character Model Files

This directory contains split versions of large character model files that were originally over 50MB in size. These files have been split to comply with GitHub's file size limits.

## File Structure

### Henry Character
- **Location**: `henry/`
- **Original file**: `henry.fbx` (51MB)
- **Split files**:
  - `henry_part_aa` (40MB)
  - `henry_part_ab` (11.7MB)
- **Configuration**: `parts.json`

### Henry Alternative Character
- **Location**: `henry/`
- **Original file**: `henry-.fbx` (51MB)
- **Split files**:
  - `henry-alt_part_aa` (40MB)
  - `henry-alt_part_ab` (11.7MB)
- **Configuration**: `parts-alt.json`

### NPC Character
- **Location**: `npc/`
- **Original file**: `npc.fbx` (51MB)
- **Split files**:
  - `npc_part_aa` (40MB)
  - `npc_part_ab` (11.4MB)
- **Configuration**: `parts.json`

## How It Works

The application uses a custom `SplitFileLoader` class that:

1. Loads all parts of a split file asynchronously
2. Reconstructs the original file in memory
3. Creates a temporary blob URL for the reconstructed file
4. Loads the file using Three.js FBXLoader
5. Cleans up the temporary blob URL

## Usage

The character files (`Henry.js`, `Npc.js`) have been updated to use the `SplitFileLoader` instead of the regular `Loader` class. The loading process is transparent to the rest of the application.

## Reconstructing Original Files

If you need to reconstruct the original files for local development:

```bash
# For henry.fbx
cat henry/henry_part_aa henry/henry_part_ab > henry.fbx

# For henry-.fbx
cat henry/henry-alt_part_aa henry/henry-alt_part_ab > henry-.fbx

# For npc.fbx
cat npc/npc_part_aa npc/npc_part_ab > npc.fbx
```

## Notes

- All split files are under 50MB to comply with GitHub's file size limits
- The original large files have been removed to save space
- The application automatically handles the reconstruction process
- No changes are needed in the rest of the codebase 