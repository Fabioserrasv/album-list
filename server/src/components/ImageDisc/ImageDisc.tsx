import ImageDisco from "../../assets/images/disco.png";

type ImageDiscProps = {
  src: string;
  alt: string;
}

export function ImageDisc({ alt, src }: ImageDiscProps) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(event) => {
        event.currentTarget.src = ImageDisco;
      }}
    />
  )
}