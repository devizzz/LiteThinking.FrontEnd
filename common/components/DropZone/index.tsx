import { Accept, useDropzone } from "react-dropzone";

interface DragZoneProps {
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
  accept: Accept;
}

const FilesDropZone = (props: DragZoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    onDrop: props.onDrop,
  });

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div style={{border: "2px #5B5B5B dashed", color: "#5B5B5B", padding: "15px", marginTop: "15px"}}>
          <p>
            Arrastre y suelte algunos archivos aquí, o haga clic para
            seleccionar archivos
          </p>
        </div>
      </div>
    </section>
  );
};

export default FilesDropZone;
