import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  <footer class="footer">
    <div class={"" <> if @type == "mobile", do: "footer_name-mobile", else: "footer_name"}>
      <p class="text-xl font-bold text-gray-700">
        {capitalize_first_letter(@user["first_name"])}
      </p>
    </div>

    <div class={"" <> if @type == "mobile", do: "footer_email-mobile", else: "footer_email"}>
      <h1 class="text-14 truncate text-gray-700 font-semibold">
        {"#{@user["first_name"]} #{@user["last_name"]}"}
      </h1>

      <p class="text-14 truncate font-normal text-gray-600">
        {String.slice("#{@user["email"]}", 0, 20)}...
      </p>
    </div>

    <div class="footer_image" phx-click="handle_log_out" phx-target={@myself}>
      <img src="/images/logout.svg" alt="logout" />
    </div>
  </footer>
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
