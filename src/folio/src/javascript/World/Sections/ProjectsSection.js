import * as THREE from 'three'
import Project from './Project'
import TweenLite from 'gsap/TweenLite'

import projectsThreejsJourneySlideASources from '../../../models/projects/threejsJourney/slideA.jpg'
import projectsThreejsJourneySlideBSources from '../../../models/projects/threejsJourney/slideB.jpg'
import projectsThreejsJourneySlideCSources from '../../../models/projects/threejsJourney/slideC.jpg'
import projectsThreejsJourneySlideDSources from '../../../models/projects/threejsJourney/slideD.jpg'

import projectsMadboxSlideASources from '../../../models/projects/madbox/slideA.jpg'
import projectsMadboxSlideBSources from '../../../models/projects/madbox/slideB.jpg'
import projectsMadboxSlideCSources from '../../../models/projects/madbox/slideC.jpg'

import projectsScoutSlideASources from '../../../models/projects/scout/slideA.jpg'
import projectsScoutSlideBSources from '../../../models/projects/scout/slideB.jpg'
import projectsScoutSlideCSources from '../../../models/projects/scout/slideC.jpg'

import projectsChartogneSlideASources from '../../../models/projects/chartogne/slideA.jpg'
import projectsChartogneSlideBSources from '../../../models/projects/chartogne/slideB.jpg'
import projectsChartogneSlideCSources from '../../../models/projects/chartogne/slideC.jpg'

import projectsZenlySlideASources from '../../../models/projects/zenly/slideA.jpg'
import projectsZenlySlideBSources from '../../../models/projects/zenly/slideB.jpg'
import projectsZenlySlideCSources from '../../../models/projects/zenly/slideC.jpg'

import projectsCitrixRedbullSlideASources from '../../../models/projects/citrixRedbull/slideA.jpg'
import projectsCitrixRedbullSlideBSources from '../../../models/projects/citrixRedbull/slideB.jpg'
import projectsCitrixRedbullSlideCSources from '../../../models/projects/citrixRedbull/slideC.jpg'

import projectsPriorHoldingsSlideASources from '../../../models/projects/priorHoldings/slideA.jpg'
import projectsPriorHoldingsSlideBSources from '../../../models/projects/priorHoldings/slideB.jpg'
import projectsPriorHoldingsSlideCSources from '../../../models/projects/priorHoldings/slideC.jpg'

import projectsOranoSlideASources from '../../../models/projects/orano/slideA.jpg'
import projectsOranoSlideBSources from '../../../models/projects/orano/slideB.jpg'
import projectsOranoSlideCSources from '../../../models/projects/orano/slideC.jpg'

// import projectsGleecChatSlideASources from '../../../models/projects/gleecChat/slideA.jpg'
// import projectsGleecChatSlideBSources from '../../../models/projects/gleecChat/slideB.jpg'
// import projectsGleecChatSlideCSources from '../../../models/projects/gleecChat/slideC.jpg'
// import projectsGleecChatSlideDSources from '../../../models/projects/gleecChat/slideD.jpg'

import projectsKepplerSlideASources from '../../../models/projects/keppler/slideA.jpg'
import projectsKepplerSlideBSources from '../../../models/projects/keppler/slideB.jpg'
import projectsKepplerSlideCSources from '../../../models/projects/keppler/slideC.jpg'

export default class ProjectsSection {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.camera = _options.camera
        this.passes = _options.passes
        this.objects = _options.objects
        this.areas = _options.areas
        this.zones = _options.zones
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('projects')
            this.debugFolder.open()
        }

        // Set up
        this.items = []

        this.interDistance = 24
        this.positionRandomess = 5
        this.projectHalfWidth = 9

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setGeometries()
        this.setMeshes()
        this.setList()
        this.setZone()

        // Add all project from the list
        for (const _options of this.list) {
            this.add(_options)
        }
    }

    setGeometries() {
        this.geometries = {}
        this.geometries.floor = new THREE.PlaneBufferGeometry(16, 8)
    }

    setMeshes() {
        this.meshes = {}

        // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
        this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter
        this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter
        this.meshes.boardPlane = this.resources.items.projectsBoardPlane.scene.children[0]
        this.meshes.areaLabel = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaOpenTexture }))
        this.meshes.areaLabel.matrixAutoUpdate = false
    }

    setList() {
        this.list = [
            {
                name: 'Games',
                imageSources:
                    [
                        projectsThreejsJourneySlideASources,
                        projectsThreejsJourneySlideBSources,
                        projectsThreejsJourneySlideCSources,
                        projectsThreejsJourneySlideDSources
                    ],
                floorTexture: this.resources.items.projectsThreejsJourneyFloorTexture,
                link:
                {
                    href: 'https://www.instagram.com/bayram.23/',
                    x: - 4.8,
                    y: - 3,
                    halfExtents:
                    {
                        x: 3.2,
                        y: 1.5
                    }
                },
                distinctions:
                    [
                    ]
            },

        ]
    }

    setZone() {
        const totalWidth = this.list.length * (this.interDistance / 2)

        const zone = this.zones.add({
            position: { x: this.x + totalWidth - this.projectHalfWidth - 6, y: this.y },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: 'projects' }
        })

        zone.on('in', (_data) => {
            this.camera.angle.set(_data.cameraAngle)
            TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, { x: 0 })
            TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, { y: 0 })
        })

        zone.on('out', () => {
            this.camera.angle.set('default')
            TweenLite.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, 2, { x: this.passes.horizontalBlurPass.strength })
            TweenLite.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, 2, { y: this.passes.verticalBlurPass.strength })
        })
    }

    add(_options) {
        const x = this.x + this.items.length * this.interDistance
        let y = this.y
        if (this.items.length > 0) {
            y += (Math.random() - 0.5) * this.positionRandomess
        }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options
        })

        this.container.add(project.container)

        // Add tiles
        if (this.items.length >= 1) {
            const previousProject = this.items[this.items.length - 1]
            const start = new THREE.Vector2(previousProject.x + this.projectHalfWidth, previousProject.y)
            const end = new THREE.Vector2(project.x - this.projectHalfWidth, project.y)
            const delta = end.clone().sub(start)
            this.tiles.add({
                start: start,
                delta: delta
            })
        }

        // Save
        this.items.push(project)
    }
}
