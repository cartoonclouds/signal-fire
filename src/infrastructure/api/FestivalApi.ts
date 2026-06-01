export class FestivalApi {
  constructor(private readonly baseUrl: string) {}

  async registerDevice(): Promise<void> {
    // TODO: POST device public key and festival/session metadata.
  }

  async downloadFestivalConfig(): Promise<void> {
    // TODO: GET maps, stages, points of interest and emergency contacts.
  }
}
