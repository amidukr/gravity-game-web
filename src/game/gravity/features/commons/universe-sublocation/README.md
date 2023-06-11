# Glossary

USS - Universe Sublocation Service
IFR - InertiaFrameReference
USL - Universe Sub Location

# Overview

UssLocation - The world is build of hierarhical location.  
UssPhysicalBody - is classical body that has motion, inertia and coodinate.
UssObject is UssPhysicalBody that is bound to UssLocation.

Physical body can transfer from one location to another, durign that transformation the global coordinate for USS object will remain unchanged, howerver local coordinate will be different in different USS Locations.

The purpose of the USS service is to normalize UssObject coordinate system and find most suitable(closest) USS location.

- Suitability is determinde by UssLocationHandler::objectPreseneceFactor. Anything below USS_OBJECT_PRESENCE_THRESHOLD cosnidered as not being present in UssLocation anymore.

Use cases are:

1.  Universe Sublocation Service should be able to handle IFR created by massive gravity object that can make space(and time) non linier. Example let's assume there are two massless object rotation around the sun, the approximation of IFR trajectory would lie as an orbit arround the sun. As result will be an PhysicalObject itself and in addition to that approximated angular velocity will be the same, so approximated IFR will rotate that objects around some IFR middlepoint with same period as it rotates around the sun.
    (In reality PhysicalObject closer to sun has faster angular velocity)
2.  Universe Sublocation Service should be flexible enough to handle non IFR location of any developer imagingation, however gravity IFR USS is needed for MVP.
    2.1 USL child srevice extension owner: One example developer may want to add sublocation to existent hierarchi - and this is extension with custom child USL, so child USL is responsible to capture parent's USS object that cam into child's USL presence spehere.
    2.2 USL parent srevice extension owner: on the other hand parent USL can act as container for child USL, while USL exists in the space provided parent, and agnostic to whatever happening outside of their space.
