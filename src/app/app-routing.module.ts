import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayersComponent } from './players/players.component';


const routes: Routes = [
  // localhost:4200:home component will be display
{path:"",component:HomeComponent},
// localhost:4200:signin component will be display
{path:"signin",component:LoginComponent},
// localhost:4200:subsription component will be display
{path:"subsription",component:SignupComponent},
{path:"signupAdmin",component:SignupComponent},
{path:"allMatches",component:MatchesComponent},
{path:"Players",component:PlayersComponent},
{path:"Add-Players",component:AddPlayerComponent},
{path:"Add-match",component:AddMatchComponent},
{path:"Add-team",component:AddTeamComponent},
{path:"Admin",component:AdminComponent},
// :id >>id paramétrer
{path:"matchInfo/:id",component:MatchInfoComponent},
{path:"editMatch/:id",component:EditMatchComponent},
{path:"search",component:SearchComponent},
{path:"playerInfo/:id",component:PlayerInfoComponent},
{path:"teamInfo/:id",component:TeamInfoComponent},
{path:"profile",component:ProfileComponent},
{path:"weather",component:WeatherComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
