export interface CastMember {
  id: number;
  name: string;
  character?: string | null;
  image?: {
    medium?: string | null;
    original?: string | null;
  } | null;
}

export default CastMember;
