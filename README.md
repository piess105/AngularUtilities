# Concept 

The project contains all the utility libraries that can me used in any project.

Each utility library is included inside its separated test project.

For instance the utility library that stands for ``drag and drop`` mechanism will be placed in
``pw-drag-drop-test-client`` project in <br>
``../projects/(name of the project)`` directory.

This concept also provides an insight to the bad and good mechanism approach. 
The code with its mechanism is first writen in bad way then its refactored. 
The bad code is stored in
``../projects/pw-drag-drop-bad`` (if applying drag drop mechanism).
The refactored code is stored in ``../project/pw-drag-drop-good`` directory.

The final paths for the utility library with drag drop mechanism should look like this:

``pw-drag-drop-test-client `` <br>
``../project/pw-drag-drop-bad`` <br>
``../project/pw-drag-drop-good``
