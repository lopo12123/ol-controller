"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("ol/ol.css");var e=require("ol"),t=require("ol/layer/Tile"),r=require("ol/source"),o=require("ol/layer/Vector"),n=require("ol/source/Vector"),l=require("ol/format"),a=require("ol/style"),s=require("ol/geom"),i=require("ol/proj"),c=require("ol/style/Circle");function y(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d,u=y(t),h=y(o),f=y(n),w=y(c);!function(e){e.stroke="#39c",e[e.strokeWidth=2]="strokeWidth",e.fill="transparent",e.IconFill="#39c",e.IconStroke="#fff",e.IconTextColor="#fff"}(d||(d={})),i.useGeographic();exports.create_point_cluster_layer=(t,o,n,l,i)=>{const c=t.map((t=>new e.Feature({type:"point_cluster",geometry:new s.Point(t.anchor),self:t}))),y=new f.default({features:c}),u=new r.Cluster({distance:n,minDistance:l,source:y}),p={};return new h.default({source:u,style:e=>{const t=e.get("features").length;let r=p[t];return r||(r=((e,t,r)=>{const o="function"==typeof r?.text?r.text(e):r?.text??e.toString();return new a.Style({image:!1===r?.hideIcon?t:new w.default({radius:r?.radius??10,stroke:new a.Stroke({color:r?.borderColor??d.IconStroke}),fill:new a.Fill({color:r?.backgroundColor??d.IconFill})}),text:new a.Text({text:o,fill:new a.Fill({color:r?.textColor??d.IconTextColor})})})})(t,new a.Icon({anchor:[.5,.5],scale:1,anchorXUnits:"fraction",anchorYUnits:"fraction",src:o}),i),p[t]=r),r}})},exports.create_point_layer=(t,r)=>{const o=new f.default,n=new h.default({source:o});return t.forEach((t=>{const n=new e.Feature({type:"point",geometry:new s.Point(t.anchor),self:t});n.setStyle(new a.Style({image:new a.Icon({anchor:[.5,.5],scale:1,anchorXUnits:"fraction",anchorYUnits:"fraction",src:t.icon??r})})),o.addFeature(n)})),n},exports.create_polygon_layer__GeoJson=(e,t)=>("dashed"!==t?.strokeType||t?.dashArray||console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.'),new h.default({source:new f.default({url:e,format:new l.GeoJSON}),style:new a.Style({stroke:new a.Stroke({color:t?.stroke??d.stroke,width:t?.strokeWidth??d.strokeWidth,lineDash:"dashed"===t?.strokeType?t?.dashArray??[0,0]:[0,0]}),fill:new a.Fill({color:t?.fill??d.fill})})})),exports.create_polygon_layer__PathArray=(t,r)=>{"dashed"!==r?.strokeType||r?.dashArray||console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.');const o=new f.default,n=new h.default({source:o});return t.forEach((t=>{const n=new e.Feature({type:"polygon",geometry:new s.Polygon([t.path]),self:t});let l=[0,0];"dashed"===t.style?.strokeType&&t.style.dashArray?l=t.style.dashArray:!t.style?.strokeType&&"dashed"===r?.strokeType&&r.dashArray&&(l=r.dashArray),n.setStyle(new a.Style({stroke:new a.Stroke({color:t.style?.stroke??r?.stroke??d.stroke,width:t.style?.strokeWidth??r?.strokeWidth??d.strokeWidth,lineDash:l}),fill:new a.Fill({color:t.style?.fill??r?.fill??d.fill})})),o.addFeature(n)})),n},exports.create_polyline_layer=(t,r)=>{"dashed"!==r?.strokeType||r?.dashArray||console.warn('[OlController] The "style.StrokeType" will not function as "style.dashArray" is in invalid format.');const o=new f.default,n=new h.default({source:o});return t.forEach((t=>{const n=new e.Feature({type:"polyline",geometry:new s.LineString(t.path),self:t});let l=[0,0];if("dashed"===t.style?.strokeType&&t.style.dashArray?l=t.style.dashArray:!t.style?.strokeType&&"dashed"===r?.strokeType&&r.dashArray&&(l=r.dashArray),n.setStyle(new a.Style({stroke:new a.Stroke({color:t.style?.stroke??r?.stroke??d.stroke,width:t.style?.strokeWidth??r?.strokeWidth??d.strokeWidth,lineDash:l})})),r?.startMarker){const n=new e.Feature({type:"start-marker",geometry:new s.Point(t.path[0])});n.setStyle(new a.Style({image:new a.Icon({anchor:[.5,.5],src:r.startMarker})})),o.addFeature(n)}if(r?.endMarker){const n=new e.Feature({type:"end-marker",geometry:new s.Point(t.path[0])});n.setStyle(new a.Style({image:new a.Icon({anchor:[.5,.5],scale:1,anchorXUnits:"fraction",anchorYUnits:"fraction",src:r.endMarker})})),o.addFeature(n)}o.addFeature(n)})),n},exports.create_tile_map__xyz=(t,o,n)=>{const l={target:t,layers:[new u.default({source:o?new r.XYZ({url:o}):new r.OSM})],view:new e.View({center:n?.center??[0,0],projection:n?.projection??"EPSG:4326",zoom:n?.zoom??7,minZoom:Math.max(2,n?.minZoom??0),maxZoom:Math.min(20,n?.maxZoom??20)}),controls:[]};return new e.Map(l)};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOlsiVXNlRGVmYXVsdCIsInVzZUdlb2dyYXBoaWMiLCJwb2ludHMiLCJpY29uIiwiZGlzdGFuY2UiLCJtaW5EaXN0YW5jZSIsImNsdXN0ZXJTdHlsZSIsImZlYXR1cmVzIiwibWFwIiwicG9pbnQiLCJGZWF0dXJlIiwidHlwZSIsImdlb21ldHJ5IiwiUG9pbnQiLCJhbmNob3IiLCJzZWxmIiwic291cmNlIiwiVmVjdG9yU291cmNlIiwiY2x1c3Rlcl9zb3VyY2UiLCJDbHVzdGVyIiwic3R5bGVDYWNoZSIsIlZlY3RvckxheWVyIiwic3R5bGUiLCJmZWF0dXJlX2dyb3VwIiwic2l6ZSIsImdldCIsImxlbmd0aCIsIm51bSIsIm9yaWdpbkljb24iLCJ0ZXh0VG9TaG93IiwidGV4dCIsInRvU3RyaW5nIiwiU3R5bGUiLCJpbWFnZSIsImhpZGVJY29uIiwiQ2lyY2xlU3R5bGUiLCJyYWRpdXMiLCJzdHJva2UiLCJTdHJva2UiLCJjb2xvciIsImJvcmRlckNvbG9yIiwiSWNvblN0cm9rZSIsImZpbGwiLCJGaWxsIiwiYmFja2dyb3VuZENvbG9yIiwiSWNvbkZpbGwiLCJUZXh0IiwidGV4dENvbG9yIiwiSWNvblRleHRDb2xvciIsImNsdXN0ZXJTdHlsZUdlbmVyYXRvciIsIkljb24iLCJzY2FsZSIsImFuY2hvclhVbml0cyIsImFuY2hvcllVbml0cyIsInNyYyIsImxheWVyIiwiZm9yRWFjaCIsInBvaW50X2ZlYXR1cmUiLCJzZXRTdHlsZSIsImFkZEZlYXR1cmUiLCJnZW9qc29uIiwic3Ryb2tlVHlwZSIsImRhc2hBcnJheSIsImNvbnNvbGUiLCJ3YXJuIiwidXJsIiwiZm9ybWF0IiwiR2VvSlNPTiIsIndpZHRoIiwic3Ryb2tlV2lkdGgiLCJsaW5lRGFzaCIsInBvbHlnb25zIiwicG9seWdvbiIsInBvbHlnb25fZmVhdHVyZSIsIlBvbHlnb24iLCJwYXRoIiwiZGFzaCIsInBvbHlsaW5lcyIsInBvbHlsaW5lIiwicG9seWxpbmVfZmVhdHVyZSIsIkxpbmVTdHJpbmciLCJzdGFydE1hcmtlciIsInN0YXJ0IiwiZW5kTWFya2VyIiwiZW5kIiwiZWwiLCJvcHRpb25zIiwibWFwX29wdGlvbiIsInRhcmdldCIsImxheWVycyIsIlRpbGVMYXllciIsIlhZWiIsIk9TTSIsInZpZXciLCJWaWV3IiwiY2VudGVyIiwicHJvamVjdGlvbiIsInpvb20iLCJtaW5ab29tIiwiTWF0aCIsIm1heCIsIm1heFpvb20iLCJtaW4iLCJjb250cm9scyIsIk9sTWFwIl0sIm1hcHBpbmdzIjoiMFpBZ0JXQSwrQkFBWCxTQUFXQSxHQUNQQSxFQUFBLE9BQUEsT0FDQUEsRUFBQUEsRUFBQSxZQUFBLEdBQUEsY0FDQUEsRUFBQSxLQUFBLGNBQ0FBLEVBQUEsU0FBQSxPQUNBQSxFQUFBLFdBQUEsT0FDQUEsRUFBQSxjQUFBLE9BTkosQ0FBV0EsSUFBQUEsRUFPVixLQUdEQyxFQUFBQSxtREFpTW1DLENBQy9CQyxFQUNBQyxFQUNBQyxFQUNBQyxFQUNBQyxLQUNBLE1BQU1DLEVBQVdMLEVBQU9NLEtBQUlDLEdBQ2pCLElBQUlDLEVBQUFBLFFBQVEsQ0FDZkMsS0FBTSxnQkFDTkMsU0FBVSxJQUFJQyxFQUFBQSxNQUFNSixFQUFNSyxRQUMxQkMsS0FBTU4sTUFHUk8sRUFBUyxJQUFJQyxFQUFBQSxRQUFhLENBQUVWLGFBQzVCVyxFQUFpQixJQUFJQyxVQUFRLENBQUVmLFdBQVVDLGNBQVdXLE9BQUVBLElBRXRESSxFQUFxQyxHQUUzQyxPQUFPLElBQUlDLEVBQUFBLFFBQVksQ0FDZkwsT0FBUUUsRUFDUkksTUFBUUMsSUFDSixNQUFNQyxFQUFPRCxFQUFjRSxJQUFJLFlBQVlDLE9BQzNDLElBQUlKLEVBQVFGLEVBQVdJLEdBYXZCLE9BWElGLElBQ0FBLEVBeERVLEVBQUNLLEVBQWFDLEVBQWtCTixLQUMxRCxNQUFNTyxFQUFvQyxtQkFBaEJQLEdBQU9RLEtBQXNCUixF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