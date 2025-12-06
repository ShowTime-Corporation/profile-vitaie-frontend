import { Component } from '@angular/core';
import { FeatureCard } from '../../components/feature-card/feature-card';
import {
  Brain,
  Briefcase,
  FileCode,
  LucideAngularModule,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-angular';

@Component({
  selector: 'app-features',
  imports: [FeatureCard, LucideAngularModule],
  templateUrl: './features.html',
})
export class Features {
  // Lucide icons
  protected readonly Brain = Brain;
  protected readonly Target = Target;
  protected readonly Briefcase = Briefcase;
  protected readonly FileCode = FileCode;
  protected readonly TrendingUp = TrendingUp;
  protected readonly Shield = Shield;
}
