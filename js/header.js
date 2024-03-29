//
//
//    objective: to generate any manipulator from data using json.
//
class ManipulatorTest {
  constructor() {
    this.revJoin1 = new RevolutJoint();
    this.revJoin2 = new RevolutJoint();
    this.revJoin3 = new RevolutJoint();

    this.link1 = new link();
    this.link2 = new link();
    this.link3 = new link();
    this.endEf = new EndEffector();

    this.revJoin1.rotation.x = -Math.PI / 2;
    this.revJoin1.children[3].rotation.x = Math.PI / 2;
    this.link1.position.y = 50;
    this.revJoin2.position.y = 50;
    this.revJoin2.rotation.x = 0;
    this.revJoin2.children[3].rotation.x = Math.PI / 2;
    this.link2.rotation.z = -Math.PI / 2;
    this.link2.position.x = 50;
    this.revJoin3.position.y = 50;
    this.revJoin3.rotation.z = Math.PI / 2;
    this.revJoin3.children[3].rotation.x = Math.PI / 2;
    this.link3.position.x = 50;
    this.link3.rotation.z = Math.PI / 2;
    this.endEf.position.y = -50;
    this.endEf.rotation.z = -Math.PI / 2;
    this.revJoin1.children[3].add(
      this.link1.add(
        this.revJoin2.add(
          this.link2.add(this.revJoin3.add(this.link3.add(this.endEf)))
        )
      )
    );

    // return this.revJoin1;
  }

  setAngle(angles) {
    const { a1, a2, a3 } = angles;
    this.revJoin1.rotation.z = a1;
    this.revJoin2.rotation.z = a2;
    this.revJoin3.rotation.z = a3;
  }
}

class EndEffector {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(12 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xffcc00 })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.frame = new Frame();
    this.frame.add(this.mesh);
    return this.frame;
  }
}

class PrismaticJoint {
  constructor(
    geometry = new THREE.BoxGeometry(30, 30, 90, 32),
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
      // transparent: true,
      // opacity: 0.2
    })
  ) {
    this.frame = new Frame();
    this.material = material;
    this.geometry = geometry;
    this.frame.add(new THREE.Mesh(this.geometry, this.material));
    this.frame.children[3].position.set(0, 45, 0);
    return this.frame;
  }
}

class link {
  constructor(
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 }
  ) {
    (this.geometry = new THREE.CylinderGeometry(10, 10, 100, 32)),
      (this.material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.7
      }));

    // this.material.transparent = true;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    var { x, y, z } = position;
    this.mesh.position.set(x, y, z);
    var { x, y, z } = rotation;
    this.mesh.rotation.set(x, y, z);

    // this.mesh.rotation.set(rotation);
    return this.mesh;
  }
}

class RevolutJoint {
  constructor(
    geometry = new THREE.CylinderGeometry(30, 30, 90, 32),
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.2
    })
  ) {
    this.frame = new Frame();
    this.material = material;
    this.geometry = geometry;
    this.frame.add(new THREE.Mesh(this.geometry, this.material));
    return this.frame;
  }
}

class Frame {
  /*
        frame: represents the axis, and has a pivot and can be used as a pivot. x: red, y:green, z: blue
    */

  constructor(_scale = 1) {
    let scale = _scale;
    let axis = {
      x: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0xff0000
          // transparent: true,
          // opacity: 0.7
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0xff0000
            // transparent: true,
            // opacity: 0.7
          })
        )
      ),
      y: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x00ff00
          // transparent: true,
          // opacity: 0.7
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x00ff00
            // transparent: true,
            // opacity: 0.7
          })
        )
      ),
      z: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x0000ff
          // transparent: true,
          // opacity: 0.7
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x0000ff
            // transparent: true,
            // opacity: 0.7
          })
        )
      )
    };

    /*current frame = */

    axis.x.position.x = 10;
    axis.x.children[0].position.y = 12.5;
    axis.x.rotation.z = -Math.PI / 2;

    // axis.y.rotation.y = Math.PI / 2;
    axis.y.position.y = 10;
    axis.y.children[0].position.y = 12.5;

    axis.z.position.z = 10;
    axis.z.children[0].position.y = 12.5;
    axis.z.rotation.x = Math.PI / 2;

    this.pivot = new Pivot();
    this.pivot
      .add(axis.x)
      .add(axis.y)
      .add(axis.z);

    return this.pivot;
  }
}

class Pivot {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(2 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xffcc00 })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }
}

class Segment {
  constructor(
    geometry = new THREE.CylinderGeometry(5, 5, 20, 32),
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.7
    })
  ) {
    this.material = material;

    this.geometry = geometry;
    // this.material.transparent = true;

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.pivot = new Pivot();

    //updatating pivot
    this.pivot.position.set(this.mesh.position);
    this.pivot.rotation.set(this.mesh.rotation);

    return this.mesh;
  }
}

/* 
    Notes:

*/

/*
  data structure that defines any manipulator.

  thing to consider:

  - every manipulator needs to have joints (revolut and ), and links (link lengths  labels).

  
  [
    {
      type:'RevolutJoint', 
      frame:{x:'x', y:'y', z:'z'},//object frame with respect to the real world frame.
      radious:0,
      height:0,
      color:0x000000,
      name:rJoint1,
      offsetPosition:{x:0,y:0,z:0}

    },{
      type:'link', 
      frame:{x:'x', y:'y', z:'z'},
      radious:0,
      height:0,
      color:0x000000,
      name:a1,
      offsetPosition:{x:0,y:0,z:0}
    },{
      type:'PrismaticJoint', 
      frame:{x:0,y:0,z:0},
      width:0,
      height:0,
      color:0x000000,
      name:pJoint1,
      offsetPosition:{x:0,y:0,z:0}
    }
  ]


*/
