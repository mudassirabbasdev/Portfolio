import DotField from './reactbits/DotField';

// The hero's dot field, shared by the whole page. It is one fixed, click-through layer behind every section, so
// there is a single WebGL canvas and the dots stay in place while the content scrolls over them.
// holdToZoom is off here: with a page-wide field, pressing the mouse anywhere (buttons, ticket stubs) must not zoom it.
export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <DotField
        gradientFrom="#276159"
        gradientTo="#483470"
        dotRadius={1}
        dotSpacing={12}
        cursorRadius={150}
        bulgeStrength={0.6}
        glowRadius={160}
        holdToZoom={false}
        maxDevicePixelRatio={1.5}
      />
    </div>
  );
}
