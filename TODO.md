# IN-PROGRESS

# BACKLOG

Current
   1. Animate planet circle moving
   1. Implement gravity for starship movement
      1. Make enabling/disabling gravity configurable
   1. GFX: Terra generation

Game logic 
   
   1. Scale planet same way as sun
   1. Gameplay: Launchpad on planets

GFX:
   1. GFX: Sun is white and has star shape in space
   1. GFX: Use startship model
   1. GFX: Scale size to take same size on the screen
   1. GFX: Fog on planet
   1. GFX: Use point light intensity/decay - to make make similar light effect
   1. GFX: Cleanup backgrounds

Future Plans
   1. Music/Sound
   1. Game Keyboard Help

Defect
   1. Keeping V breaks, due to ScaleSunSizeLoop plugin.

Technical Tasks
   1. Implement module for configuration
      1. Configuration overide sequence
         - Configuration from console
         - Configuration from level file
         - Global configuration
   1. Game save/load for debugging

# Plan
   1. Gameplay
      1. Explore
      1. Fight
      1. Build
      1. Trade
      1. Command
      1. Free play vs campaing levels 

# Optimization
   1. Use FXAA insteado of MSAA
   2. ZBuffer fight
      1. Test different approaches to optimize zfight
         - Check [Z-Fighting](./docs/z-fighting-performance-comparision.md) for more details
      1. Buffer is 24bit by default however fighting still happening
      1. logarithm looks like not an option, will force to shading for all faces
   3. Align units system either to seconds or to miliseconds

# DONE

1. Setup 
   1. Typescript
   2. Webpack
   3. Linter
   4. Dev Sever
1. Implement game framework
1. Refactoring
   1. Rename GameController to GameLooper
   1. Generify getComponent with TypeIdentifier
   1. Implement GameLoadingController
      1. Extract GameLoader and GameLevelRepository interface to common
   1. Replace bindToGlobalFunctions with interface
      1. Support to retrieve multuple interfaces
1. Refactoring 
   1. Rebuilding Game Loading sequence
1. Animate startship moving
1. GFX: Space background
1. GameView/Input
   1. Free fly camera
   1. Orbiter camera
1. Add Keyboard control
   - Q/E - rotate around z axis
   - increase/decrease velocity
   - Enable/Disable mouse navigation
1. Increase planet size to something more realistic
1. GFX: Atmosphere
      1. Create scene with sun, planet. background
      1. Configure orbit map in center of this planet
      1. Setup alfa color, to make plane visible from space, but make space invisible from planet.
         - 3 Alfa colors needed: Space -> Entering atmosphere -> planet surface
         - stage = 0 ... 3 
           - 0 - space
           - 1 - Entering atmosphere
           - 2 - planet surface
         -  alfa = closestTo(0) * spaceAlfa + closestTo(1)*atmospereAlfa + closesTo(1) * planetSurfaceAlfa
         - test transitions using transitions between R -> G -> B
