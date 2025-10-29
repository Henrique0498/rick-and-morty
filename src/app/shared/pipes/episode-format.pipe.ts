import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'episodeFormat', standalone: true })
export class EpisodeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/S(\d+)E(\d+)/i);
    if (!match) return value;
    const [_, season, ep] = match;
    return `Temporada ${parseInt(season)}, Episódio ${parseInt(ep)}`;
  }
}
